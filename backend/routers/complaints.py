from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import schemas, crud, models
from database import get_db
from auth import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.ComplaintResponse)
def create_complaint(complaint: schemas.ComplaintCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Use the logged-in user's ID
    db_complaint, cluster = crud.create_complaint(db=db, complaint=complaint, user_id=current_user.id)
    return db_complaint

@router.get("/", response_model=List[schemas.ComplaintResponse])
def read_complaints(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    complaints = crud.get_complaints(db, skip=skip, limit=limit)
    return complaints

@router.get("/my")
def read_my_complaints(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    complaints = crud.get_user_complaints(db, user_id=current_user.id, skip=skip, limit=limit)
    print(f"DEBUG: Fetched {len(complaints)} complaints for user_id={current_user.id}")
    return complaints

@router.delete("/{complaint_id}")
def delete_complaint(complaint_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    success = crud.delete_complaint(db, complaint_id=complaint_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Complaint not found or not authorized to delete")
    return {"message": "Complaint deleted successfully"}
