from sqlalchemy import Column, Integer, String, Date, Boolean
from app.database import Base

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)

    company_name = Column(String, nullable=False)
    job_title = Column(String, nullable=False)
    location = Column(String, nullable=True)
    status = Column(String, nullable=False)
    
    job_url = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    
    date_applied = Column(Date, nullable=True)

    is_archived = Column(Boolean, default=False)
    archived_at = Column(Date, nullable=True)