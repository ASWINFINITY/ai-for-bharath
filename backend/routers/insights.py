from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import models
from database import get_db
from clustering import get_distance

router = APIRouter()

@router.get("/")
def get_insights(db: Session = Depends(get_db)):
    # MVP Signal Fusion AI insight
    # Find two high-risk clusters of different categories within 1km
    high_risk_clusters = db.query(models.Cluster).filter(models.Cluster.risk_score >= 70).all()
    
    insights = []
    
    # O(N^2) for MVP, fine for small dataset
    for i in range(len(high_risk_clusters)):
        for j in range(i + 1, len(high_risk_clusters)):
            c1 = high_risk_clusters[i]
            c2 = high_risk_clusters[j]
            
            if c1.category != c2.category:
                dist = get_distance(c1.center_lat, c1.center_lon, c2.center_lat, c2.center_lon)
                if dist <= 1.0: # within 1km
                    insights.append({
                        "type": "fusion",
                        "message": f"Overlapping civic signals detected: {c1.category} + {c2.category}. Possible linked risk zone.",
                        "cluster_ids": [c1.id, c2.id],
                        "distance_km": round(dist, 2)
                    })
    
    # Return recommendations based on all clusters
    recommendations = []
    for c in high_risk_clusters:
        if c.category == "Public Safety":
            recommendations.append(f"Deploy patrol unit near Zone {c.id} due to high safety risk ({c.risk_score}/100).")
        elif c.category == "Utilities":
            recommendations.append(f"Alert utility maintenance for Zone {c.id} - potential cascading failure.")
            
    return {
        "insights": insights,
        "recommendations": recommendations[:5] # Limit to top 5
    }
