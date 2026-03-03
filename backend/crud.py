from sqlalchemy.orm import Session
import models, schemas, auth
import json

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(email=user.email, name=user.name, password_hash=hashed_password, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_complaint(db: Session, complaint: schemas.ComplaintCreate, user_id: int = None):
    # Optional embedding generation here or later
    from clustering import get_embedding
    emb = get_embedding(f"{complaint.title} {complaint.description}")
    emb_str = json.dumps(emb) if emb else None
    
    db_complaint = models.Complaint(**complaint.dict(), user_id=user_id, embedding=emb_str)
    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)
    
    # Trigger clustering
    from clustering import assign_cluster
    cluster = assign_cluster(db, db_complaint)
    
    return db_complaint, cluster

def get_complaints(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Complaint).offset(skip).limit(limit).all()

def get_clusters(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Cluster).offset(skip).limit(limit).all()

def get_cluster(db: Session, cluster_id: int):
    cluster = db.query(models.Cluster).filter(models.Cluster.id == cluster_id).first()
    if cluster:
        members = db.query(models.ClusterMember).filter(models.ClusterMember.cluster_id == cluster_id).all()
        complaint_ids = [m.complaint_id for m in members]
        complaints = db.query(models.Complaint).filter(models.Complaint.id.in_(complaint_ids)).all()
        return {"cluster": cluster, "complaints": complaints}
    return None
