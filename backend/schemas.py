from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str = "citizen"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class ComplaintBase(BaseModel):
    category: str
    title: str
    description: str
    severity: str
    lat: float
    lon: float

class ComplaintCreate(ComplaintBase):
    pass

class ComplaintResponse(ComplaintBase):
    id: int
    user_id: Optional[int]
    created_at: datetime
    class Config:
        from_attributes = True

class ClusterBase(BaseModel):
    category: str
    center_lat: float
    center_lon: float
    report_count: int
    risk_score: float
    trend: str

class ClusterResponse(ClusterBase):
    id: int
    last_updated: datetime
    class Config:
        from_attributes = True

class ClusterDetail(ClusterResponse):
    complaints: List[ComplaintResponse] = []

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
