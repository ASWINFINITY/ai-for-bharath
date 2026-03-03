from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
import models
from database import get_db

router = APIRouter()

@router.get("/")
def get_dashboard_metrics(db: Session = Depends(get_db)):
    # Total Active Reports
    total_active = db.query(models.Complaint).count()
    
    # Reports Today
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    reports_today = db.query(models.Complaint).filter(models.Complaint.created_at >= today_start).count()
    
    # High-Risk Zones Count
    high_risk_zones = db.query(models.Cluster).filter(models.Cluster.risk_score >= 80).count()
    
    # Top 5 Critical Zones
    top_zones = db.query(models.Cluster).order_by(models.Cluster.risk_score.desc()).limit(5).all()
    
    # Issue Distribution MVP
    distribution = db.query(models.Complaint.category, func.count(models.Complaint.id)).group_by(models.Complaint.category).all()
    dist_dict = {cat: count for cat, count in distribution}

    return {
        "metrics": {
            "total_active": total_active,
            "reports_today": reports_today,
            "high_risk_zones": high_risk_zones,
        },
        "top_zones": [
            {
                "id": z.id,
                "name": f"Zone {z.id} ({z.category})", # MVP name
                "category": z.category,
                "risk_score": z.risk_score,
                "status": "Open" if z.risk_score > 50 else "In Progress"
            } for z in top_zones
        ],
        "distribution": dist_dict
    }
