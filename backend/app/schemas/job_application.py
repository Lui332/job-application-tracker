from datetime import date
from typing import Optional
from pydantic import BaseModel

class JobApplicationBase(BaseModel):
    company_name: str
    job_title: str
    status: str = "saved"
    location: Optional[str] = None
    job_url: Optional[str] = None
    notes: Optional[str] = None
    date_applied: Optional[date] = None

class JobApplicationCreate(JobApplicationBase):
    pass

class JobApplicationUpdate(BaseModel):
    company_name: Optional[str] = None
    job_title: Optional[str] = None
    status: Optional[str] = None
    location: Optional[str] = None
    job_url: Optional[str] = None
    notes: Optional[str] = None
    date_applied: Optional[date] = None
    is_archived: Optional[bool] = None
    archived_at: Optional[date] = None

class JobApplicationResponse(JobApplicationBase):
    id: int
    created_at: Optional[date] = None
    is_archived: Optional[bool] = None
    archived_at: Optional[date] = None

    class Config:
        from_attributes = True