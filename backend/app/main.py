from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import job_applications
from app.database import Base, engine
from app.models import JobApplication
from app.routers import job_applications

Base.metadata.create_all(bind=engine)

app = FastAPI(
    ttile="AI Job Application Tracker",
    description="Track job application and automate applicatoin managemnet.",
    version="1.0.0"
)

app.include_router(job_applications.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/")
def root():
    return {"message": "Job Application Tracker API is running"}
