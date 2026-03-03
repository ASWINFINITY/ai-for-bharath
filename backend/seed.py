import json
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    
    # Check if already seeded
    user = db.query(models.User).filter(models.User.email == "test@example.com").first()
    if user:
        print("Database already seeded.")
        return

    # Create dummy users
    authority = crud.create_user(db, schemas.UserCreate(name="Admin Pune", email="admin@localhelp.ai", password="password123", role="authority"))
    citizen = crud.create_user(db, schemas.UserCreate(name="Rahul Sharma", email="test@example.com", password="password123", role="citizen"))
    
    # Create some demo complaints to test clustering MVP
    # This will trigger the clustering logic in create_complaint
    print("Creating demo complaints to build clusters...")
    complaints_data = [
        # Pune Center (Shivajinagar area) - High severity congestion
        schemas.ComplaintCreate(category="Public Safety", title="Traffic Congestion", description="Heavy traffic jam near Shivajinagar Square due to broken signal.", severity="high", lat=18.5314, lon=73.8519),
        schemas.ComplaintCreate(category="Public Safety", title="Accident at Junction", description="Major accident blocking the road.", severity="high", lat=18.5320, lon=73.8525),
        
        # Pune East (Hadapsar) - Medium severity roads
        schemas.ComplaintCreate(category="Utilities", title="Potholes on Main Road", description="Multiple deep potholes near Magarpatta.", severity="med", lat=18.5167, lon=73.9312),
        schemas.ComplaintCreate(category="Utilities", title="Damaged Road Surface", description="Asphalt is completely gone, very risky for two-wheelers.", severity="med", lat=18.5170, lon=73.9320),
        
        # Pune West (Kothrud) - Health/Water
        schemas.ComplaintCreate(category="Health", title="Water Logging", description="Severe water logging near depot causing dengue risk.", severity="high", lat=18.5028, lon=73.8115),
        
        # Overlapping signal for AI Insight (Near Kothrud/Karve Nagar)
        schemas.ComplaintCreate(category="Utilities", title="Open Live Wire", description="Live electric wire fallen in water.", severity="high", lat=18.5015, lon=73.8150),
    ]
    
    for c_data in complaints_data:
        crud.create_complaint(db, c_data, user_id=citizen.id)

    print("Seed complete! Created mock users, complaints, and evaluated clusters.")
    db.close()

if __name__ == "__main__":
    seed_db()
