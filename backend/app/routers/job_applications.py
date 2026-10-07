from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.JobApplication import JobApplication
from app.schemas.job_application import JobApplicationCreate, JobApplicationUpdate, JobApplicationResponse

router = APIRouter(
    prefix="/job-applications",
    tags=["Job Applications"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=JobApplicationResponse)
def create_job_application(application: JobApplicationCreate, db: Session = Depends(get_db)):
    new_application = JobApplication(
        company_name = application.company_name,
        job_title = application.job_title,
        location = application.location,
        status = application.status,
        job_url = application.job_url,
        notes = application.notes,
        date_applied = application.date_applied
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application

@router.get("/", response_model=list[JobApplicationResponse])
def fetch_job_applications(db: Session = Depends(get_db)):
    return db.query(JobApplication).filter(JobApplication.is_archived == False)

@router.get("/{application_id}", response_model=JobApplicationResponse)
def fetch_job_application_by_id(application_id: int, db: Session = Depends(get_db)):
    application = (
        db.query(JobApplication)
        .filter(JobApplication.id == application_id)
        .first()
    )

    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")

    return application

@router.put("/{application_id}", response_model=JobApplicationResponse)
def update_job_application_by_id(
    application_id: int, 
    application_update: JobApplicationUpdate,
    db: Session = Depends(get_db)
):
    application = (
        db.query(JobApplication)
        .filter(JobApplication.id == application_id)
        .first()
    )

    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    
    update_data = application_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(application, field, value)
    
    db.commit()
    db.refresh(application)

    return application


@router.patch("/{application_id}/archive", response_model=JobApplicationResponse)
def archive_job_application_by_id(application_id: int, db: Session = Depends(get_db)):
    application = (
        db.query(JobApplication)
        .filter(JobApplication.id == application_id)
        .first()
    )

    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    
    application.is_archived = True
    application.archived_at = datetime.now(timezone.utc).date()

    db.commit()
    db.refresh(application)

    return application