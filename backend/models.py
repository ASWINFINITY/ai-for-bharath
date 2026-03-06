from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="citizen") # citizen or authority
    reward_points = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    complaints = relationship("Complaint", back_populates="user")

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    category = Column(String, index=True)
    title = Column(String)
    description = Column(Text)
    severity = Column(String) # low, med, high
    lat = Column(Float)
    lon = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    embedding = Column(String, nullable=True) # store as JSON string or base64 if needed

    user = relationship("User", back_populates="complaints")

class Cluster(Base):
    __tablename__ = "clusters"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True)
    center_lat = Column(Float)
    center_lon = Column(Float)
    report_count = Column(Integer, default=1)
    risk_score = Column(Float, default=0.0)
    trend = Column(String, default="stable") # stable/rising/spiking
    last_updated = Column(DateTime, default=datetime.datetime.utcnow)

class ClusterMember(Base):
    __tablename__ = "cluster_members"

    id = Column(Integer, primary_key=True, index=True)
    cluster_id = Column(Integer, ForeignKey("clusters.id"))
    complaint_id = Column(Integer, ForeignKey("complaints.id"))
