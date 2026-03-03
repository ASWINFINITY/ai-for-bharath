import logging
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import math
from models import Complaint, Cluster, ClusterMember

logger = logging.getLogger(__name__)

try:
    from sentence_transformers import SentenceTransformer, util
    model = SentenceTransformer('all-MiniLM-L6-v2')
    HAS_TRANSFORMERS = True
except Exception as e:
    logger.warning(f"Could not load sentence-transformers: {e}. Using fallback clustering.")
    HAS_TRANSFORMERS = False
    
def get_distance(lat1, lon1, lat2, lon2):
    """Calculate distance in km between two lat/lon points using Haversine formula."""
    R = 6371  # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = R * c
    return distance

def get_embedding(text: str):
    if HAS_TRANSFORMERS:
        return model.encode(text).tolist()
    return []

def compute_similarity(emb1, emb2):
    if not HAS_TRANSFORMERS or not emb1 or not emb2:
        return 0.0
    return util.cos_sim(emb1, emb2).item()

def assign_cluster(db: Session, complaint: Complaint):
    # 1. generate embedding
    # embedding is already generated and stored in complaint.embedding (as string rep of list)
    import json
    try:
        current_emb = json.loads(complaint.embedding) if complaint.embedding else get_embedding(f"{complaint.title} {complaint.description}")
    except:
        current_emb = get_embedding(f"{complaint.title} {complaint.description}")

    # 2. search recent complaints in same category within 2km and last 14 days
    cutoff_date = datetime.utcnow() - timedelta(days=14)
    recent_complaints = db.query(Complaint).filter(
        Complaint.category == complaint.category,
        Complaint.created_at >= cutoff_date,
        Complaint.id != complaint.id
    ).all()

    best_match_cluster_id = None
    highest_sim = 0.0

    for rc in recent_complaints:
        # Check distance
        if rc.lat and rc.lon and complaint.lat and complaint.lon:
            dist = get_distance(complaint.lat, complaint.lon, rc.lat, rc.lon)
            if dist <= 2.0:
                rc_emb = None
                if rc.embedding:
                    try:
                        rc_emb = json.loads(rc.embedding)
                    except:
                        pass
                if rc_emb and current_emb:
                    sim = compute_similarity(current_emb, rc_emb)
                    if sim > 0.75 and sim > highest_sim:
                        highest_sim = sim
                        
                        # Find the cluster of this matching complaint
                        member = db.query(ClusterMember).filter(ClusterMember.complaint_id == rc.id).first()
                        if member:
                            best_match_cluster_id = member.cluster_id

    if best_match_cluster_id:
        cluster = db.query(Cluster).filter(Cluster.id == best_match_cluster_id).first()
        if cluster:
            # Update cluster
            cluster.report_count += 1
            cluster.last_updated = datetime.utcnow()
            # Update center (simple average, could be improved)
            cluster.center_lat = ((cluster.center_lat * (cluster.report_count - 1)) + complaint.lat) / cluster.report_count
            cluster.center_lon = ((cluster.center_lon * (cluster.report_count - 1)) + complaint.lon) / cluster.report_count
            
            # Add to members
            db.add(ClusterMember(cluster_id=cluster.id, complaint_id=complaint.id))
            db.commit()
            update_cluster_risk(db, cluster)
            return cluster
            
    # Create new cluster
    new_cluster = Cluster(
        category=complaint.category,
        center_lat=complaint.lat,
        center_lon=complaint.lon,
        report_count=1,
        last_updated=datetime.utcnow()
    )
    db.add(new_cluster)
    db.commit()
    db.refresh(new_cluster)
    db.add(ClusterMember(cluster_id=new_cluster.id, complaint_id=complaint.id))
    db.commit()
    update_cluster_risk(db, new_cluster)
    return new_cluster

def update_cluster_risk(db: Session, cluster: Cluster):
    # Risk scoring MVP
    # base = min(50, cluster_report_count*5)
    base = min(50, cluster.report_count * 5)
    
    # severity bonus
    members = db.query(ClusterMember).filter(ClusterMember.cluster_id == cluster.id).all()
    complaint_ids = [m.complaint_id for m in members]
    complaints = db.query(Complaint).filter(Complaint.id.in_(complaint_ids)).all()
    
    severity_sum = 0
    urgency_bonus = 0
    urgency_words = ["fire", "accident", "collapse", "outbreak", "dengue", "live wire", "hazard", "leak", "severe", "outage"]
    
    for c in complaints:
        if c.severity == "high": severity_sum += 30
        elif c.severity == "med": severity_sum += 15
        elif c.severity == "low": severity_sum += 5
        
        text = f"{c.title} {c.description}".lower()
        if any(w in text for w in urgency_words):
            urgency_bonus = min(20, urgency_bonus + 5)
            
    avg_severity = severity_sum / len(complaints) if complaints else 0
    
    # trend bonus simple
    # if it updated multiple times in 24h
    recent_members = [c for c in complaints if c.created_at >= datetime.utcnow() - timedelta(hours=24)]
    trend_bonus = min(20, len(recent_members) * 5)
    if len(recent_members) > 3:
        cluster.trend = "spiking"
    elif len(recent_members) > 0:
        cluster.trend = "rising"
    else:
        cluster.trend = "stable"
        
    total_risk = base + avg_severity + urgency_bonus + trend_bonus
    cluster.risk_score = min(100.0, total_risk)
    
    db.commit()
