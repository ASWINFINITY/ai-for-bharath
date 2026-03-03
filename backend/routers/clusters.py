from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import schemas, crud
from database import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.ClusterResponse])
def read_clusters(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clusters = crud.get_clusters(db, skip=skip, limit=limit)
    return clusters

@router.get("/{cluster_id}", response_model=schemas.ClusterDetail)
def read_cluster(cluster_id: int, db: Session = Depends(get_db)):
    data = crud.get_cluster(db, cluster_id=cluster_id)
    if data is None:
        raise HTTPException(status_code=404, detail="Cluster not found")
    
    # Transform to match schema
    cluster = data["cluster"]
    cluster_dict = {
        "id": cluster.id,
        "category": cluster.category,
        "center_lat": cluster.center_lat,
        "center_lon": cluster.center_lon,
        "report_count": cluster.report_count,
        "risk_score": cluster.risk_score,
        "trend": cluster.trend,
        "last_updated": cluster.last_updated,
        "complaints": data["complaints"]
    }
    return cluster_dict
