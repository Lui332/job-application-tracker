from datetime import date
from typing import Annotated, Optional
from pydantic import BaseModel, StringConstraints

RequiredText = Annotated[
    str,
    StringConstraints(strip_whitespace=True, min_length=1),
]

class JobApplicationBase(BaseModel):
    company_name: RequiredText
    job_title: RequiredText
    status: RequiredText
    location: Optional[str] = None
    job_url: Optional[str] = None
    notes: Optional[str] = None
    date_applied: Optional[date] = None

class JobApplicationCreate(JobApplicationBase):
    pass

class JobApplicationUpdate(BaseModel):
    company_name: RequiredText
    job_title: RequiredText
    status: RequiredText
    location: Optional[str] = None
    job_url: Optional[str] = None
    notes: Optional[str] = None
    date_applied: Optional[date] = None
    is_archived: Optional[bool] = None
    archived_at: Optional[date] = None

class JobApplicationResponse(JobApplicationBase):
    id: int
    is_archived: Optional[bool] = None
    archived_at: Optional[date] = None

    class Config:
        from_attributes = True
