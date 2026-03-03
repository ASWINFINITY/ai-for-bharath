from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import schemas, crud
from database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.ComplaintResponse)
def create_complaint(complaint: schemas.ComplaintCreate, db: Session = Depends(get_db)):
    # Simulating logged in user for MVP, passing user_id=None or 1
    db_complaint, cluster = crud.create_complaint(db=db, complaint=complaint)
    return db_complaint

@router.get("/", response_model=List[schemas.ComplaintResponse])
def read_complaints(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    complaints = crud.get_complaints(db, skip=skip, limit=limit)
    return complaints
