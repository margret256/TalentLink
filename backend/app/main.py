from __future__ import annotations

import json
import hashlib
import os
from datetime import datetime, timedelta, timezone
from typing import Any, Literal

import jwt
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field
from pwdlib import PasswordHash
from sqlalchemy import select, text
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import AppData, Application as ApplicationModel, Job as JobModel, Message, Notification, SavedJob as SavedJobModel, User

app = FastAPI(title="TalentLink API", description="Backend API for TalentLink", version="1.0.0")
password_hash = PasswordHash.recommended()
bearer_scheme = HTTPBearer(auto_error=False)
JWT_SECRET = os.getenv("JWT_SECRET", "talentlink-development-secret-change-me")
JWT_ALGORITHM = "HS256"
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


class LoginRequest(BaseModel):
    email: str = Field(..., example="user@example.com")
    password: str = Field(..., example="secret123")


class SignupRequest(LoginRequest):
    fullName: str = Field(..., example="Ali Raza")
    role: Literal["talent", "employer"] = "talent"


class OpportunityRequest(BaseModel):
    title: str = ""
    company: str = ""
    location: str = "Remote"
    type: str | None = None
    jobType: str | None = None
    experience: str = "Mid Level"
    salary: str | None = None
    salaryMin: str = ""
    salaryMax: str = ""
    category: str = ""
    skills: str | list[str] = ""
    deadline: str = ""
    description: str = ""
    requirements: list[str] = []


class ProfileUpdate(BaseModel):
    name: str | None = None
    title: str | None = None
    location: str | None = None
    availability: str | None = None
    bio: str | None = None
    skills: list[str] | None = None


class MessageRequest(BaseModel):
    recipient_id: int
    body: str = Field(..., min_length=1, max_length=2000)


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        if password_hash.verify(password, stored_hash):
            return True
    except Exception:
        pass
    return hashlib.sha256(password.encode()).hexdigest() == stored_hash


def create_token(user: User) -> str:
    payload = {"sub": str(user.id), "role": user.role, "exp": datetime.now(timezone.utc) + timedelta(days=7)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    if not credentials:
        raise HTTPException(status_code=401, detail="Authentication required")
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user = db.get(User, int(payload["sub"]))
    except (jwt.PyJWTError, KeyError, TypeError, ValueError):
        user = None
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return user


def require_employer(user: User = Depends(get_current_user)) -> User:
    if user.role != "employer":
        raise HTTPException(status_code=403, detail="Employer access required")
    return user


def split_text(value: str) -> list[str]:
    return json.loads(value) if value else []


def job_response(job: JobModel) -> dict[str, Any]:
    return {"id": job.id, "title": job.title, "company": job.company, "location": job.location, "type": job.type, "experience": job.experience, "salary": job.salary, "posted": job.posted, "skills": split_text(job.skills), "deadline": job.deadline, "description": job.description, "requirements": split_text(job.requirements)}


def seed_data(db: Session) -> None:
    if db.scalar(select(User).limit(1)) is not None:
        return
    user = User(name="Gull", email="gull@example.com", password=hash_password("demo123"), title="Frontend Developer", location="Islamabad, Pakistan", availability="Open to work", bio="Frontend developer passionate about building polished interfaces and product experiences.", skills=json.dumps(["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Git & GitHub", "Node.js"]), experience=json.dumps(["Frontend Developer at TechNova Inc. - 2023 to 2025", "UI Engineer at Pixel Perfect - 2021 to 2023"]), education=json.dumps(["BS Computer Science, FAST-NUCES", "Certified Frontend Developer"]))
    db.add(user)
    jobs = [
        JobModel(title="React Developer", company="TechNova Inc.", location="Remote", type="Full Time", experience="Mid Level", salary="$600 - $1000/month", posted="2 hours ago", skills=json.dumps(["React", "JavaScript", "Tailwind CSS"]), deadline="20 June, 2026", description="Build modern and responsive web applications with our product team.", requirements=json.dumps(["Strong experience with React.js", "JavaScript ES6+", "REST API integration"])),
        JobModel(title="UI/UX Designer", company="Pixel Perfect", location="Lahore, Pakistan", type="Part Time", experience="Senior Level", salary="$400 - $700/month", posted="5 hours ago", skills=json.dumps(["Figma", "UI/UX", "Design Systems"]), deadline="25 June, 2026", description="Craft intuitive and delightful user experiences across web and mobile products.", requirements=json.dumps(["Proficiency in Figma", "Strong portfolio of UI/UX work", "Understanding of design systems"])),
    ]
    db.add_all(jobs)
    db.flush()
    db.add_all([ApplicationModel(title="UI/UX Designer", company="Pixel Perfect", applied_date="20 May, 2026", status="Accepted", user_id=user.id, job_id=jobs[1].id), ApplicationModel(title="React Developer", company="TechNova Inc.", applied_date="15 May, 2026", status="Pending", user_id=user.id, job_id=jobs[0].id), SavedJobModel(title=jobs[0].title, company=jobs[0].company, salary=jobs[0].salary, location=jobs[0].location, user_id=user.id)])
    records = {
        "categories": [{"id": 1, "title": "Web Development", "jobs": "12.5K+"}, {"id": 2, "title": "Mobile Development", "jobs": "8.4K+"}, {"id": 3, "title": "UI/UX Design", "jobs": "6.9K+"}],
        "companies": ["Microsoft", "Google", "airbnb", "Spotify", "amazon"],
        "messages": [{"id": 1, "sender": "Ayesha Khan", "preview": "Thanks! We would love to schedule a call next week.", "time": "10:15 AM", "unread": True}],
        "notifications": [{"id": 1, "text": "Your application for React Developer has been viewed.", "time": "2h ago", "type": "application"}],
        "settings": {"email": user.email, "notifications": True, "privacy": "Private", "theme": "Light"},
        "admin": {"totalUsers": 1, "totalOpportunities": 2, "totalApplications": 2, "totalRevenue": "$0", "usersGrowth": []},
        "projects": [{"id": 1, "title": "TalentLink Dashboard", "description": "A dashboard to manage jobs and opportunities.", "tech": ["React", "Tailwind CSS", "Vite"], "link": "https://example.com"}],
    }
    user_data_types = {"messages", "notifications", "settings", "projects"}
    db.add_all([AppData(data_type=key, data=value, user_id=user.id if key in user_data_types else None) for key, value in records.items()])
    db.commit()


def ensure_notifications(db: Session) -> None:
    if db.scalar(select(Notification).limit(1)) is not None:
        return
    users = db.scalars(select(User)).all()
    for user in users:
        message = "Your application for React Developer has been viewed." if user.role != "employer" else "Your employer account is ready to post opportunities."
        db.add(Notification(user_id=user.id, text=message, time="Today", type="application" if user.role != "employer" else "job", unread=True))
    db.commit()


@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=engine)
    with engine.begin() as connection:
        connection.execute(text("ALTER TABLE app_data ADD COLUMN IF NOT EXISTS user_id INTEGER"))
        connection.execute(text("UPDATE app_data SET user_id = (SELECT MIN(id) FROM users) WHERE user_id IS NULL AND data_type IN ('messages', 'notifications', 'settings', 'projects')"))
        connection.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS company VARCHAR(160) NOT NULL DEFAULT ''"))
        connection.execute(text("ALTER TABLE jobs ADD COLUMN IF NOT EXISTS employer_id INTEGER"))
        connection.execute(text("ALTER TABLE saved_jobs ADD COLUMN IF NOT EXISTS job_id INTEGER"))
    db = next(get_db())
    try:
        seed_data(db)
        ensure_notifications(db)
    finally:
        db.close()


def data_record(db: Session, data_type: str, user_id: int | None = None) -> Any:
    query = select(AppData).where(AppData.data_type == data_type)
    if user_id is not None:
        query = query.where(AppData.user_id == user_id)
    record = db.scalar(query)
    return record.data if record else ([] if data_type not in {"settings", "admin"} else {})


@app.get("/")
def root() -> dict:
    return {"message": "TalentLink API is running"}


@app.get("/api/health")
def health(db: Session = Depends(get_db)) -> dict:
    db.execute(select(User).limit(1))
    return {"status": "ok", "service": "talentlink-api", "database": "connected"}


@app.get("/api/jobs")
def get_jobs(db: Session = Depends(get_db)) -> list[dict]:
    return [job_response(job) for job in db.scalars(select(JobModel)).all()]


@app.get("/api/employer/jobs")
def get_employer_jobs(user: User = Depends(require_employer), db: Session = Depends(get_db)) -> list[dict]:
    return [job_response(job) for job in db.scalars(select(JobModel).where(JobModel.employer_id == user.id)).all()]


@app.get("/api/employer/jobs/{job_id}")
def get_employer_job(job_id: int, user: User = Depends(require_employer), db: Session = Depends(get_db)) -> dict:
    job = db.scalar(select(JobModel).where(JobModel.id == job_id, JobModel.employer_id == user.id))
    if not job:
        raise HTTPException(status_code=404, detail="Your opportunity was not found")
    return job_response(job)


@app.get("/api/jobs/{job_id}")
def get_job(job_id: int, db: Session = Depends(get_db)) -> dict:
    job = db.get(JobModel, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return job_response(job)


@app.post("/api/jobs/{job_id}/apply")
def apply_to_job(job_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict:
    job = db.get(JobModel, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    existing = db.scalar(select(ApplicationModel).where(ApplicationModel.job_id == job_id, ApplicationModel.user_id == user.id))
    if existing:
        return {"message": "Already applied", "applicationId": existing.id}
    application = ApplicationModel(title=job.title, company=job.company, applied_date="Today", status="Pending", user_id=user.id, job_id=job.id)
    db.add(application)
    db.commit()
    return {"message": "Application submitted", "applicationId": application.id}


@app.post("/api/jobs/{job_id}/save")
def save_job(job_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict:
    job = db.get(JobModel, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    existing = db.scalar(select(SavedJobModel).where(SavedJobModel.job_id == job_id, SavedJobModel.user_id == user.id))
    if not existing:
        db.add(SavedJobModel(title=job.title, company=job.company, salary=job.salary, location=job.location, user_id=user.id, job_id=job.id))
        db.commit()
    return {"message": "Job saved", "jobId": job.id}


@app.get("/api/applications")
def get_applications(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> list[dict]:
    query = select(ApplicationModel).where(ApplicationModel.user_id == user.id)
    return [{"id": item.id, "title": item.title, "company": item.company, "appliedDate": item.applied_date, "status": item.status} for item in db.scalars(query).all()]


@app.get("/api/profile")
def get_profile(user: User = Depends(get_current_user)) -> dict:
    return {"name": user.name, "title": user.title, "location": user.location, "email": user.email, "availability": user.availability, "bio": user.bio, "skills": split_text(user.skills), "experience": split_text(user.experience), "education": split_text(user.education)}


@app.put("/api/profile")
def update_profile(payload: ProfileUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict:
    updates = payload.model_dump(exclude_unset=True)
    if "skills" in updates:
        user.skills = json.dumps(updates.pop("skills"))
    for field, value in updates.items():
        setattr(user, field, value)
    db.commit()
    return get_profile(user)


@app.get("/api/dashboard")
def get_dashboard(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict:
    applications = get_applications(user, db)
    jobs = get_jobs(db)
    return {"profileViews": "0", "applications": len(applications), "savedJobs": len(db.scalars(select(SavedJobModel).where(SavedJobModel.user_id == user.id)).all()), "messages": len(data_record(db, "messages", user.id)), "recentApplications": applications[:3], "opportunities": [{"id": j["id"], "title": j["title"], "company": j["company"], "salary": j["salary"]} for j in jobs[:3]], "skills": get_profile(user)["skills"], "activityFeed": []}


@app.get("/api/projects")
def get_projects(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return data_record(db, "projects", user.id)


@app.get("/api/saved-jobs")
def get_saved_jobs(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return [{"id": x.id, "title": x.title, "company": x.company, "salary": x.salary, "location": x.location} for x in db.scalars(select(SavedJobModel).where(SavedJobModel.user_id == user.id)).all()]


@app.get("/api/messages")
def get_messages(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    messages = db.scalars(select(Message).where((Message.sender_id == user.id) | (Message.recipient_id == user.id)).order_by(Message.id)).all()
    return [{"id": item.id, "senderId": item.sender_id, "recipientId": item.recipient_id, "sender": db.get(User, item.sender_id).name, "recipient": db.get(User, item.recipient_id).name, "body": item.body, "time": item.sent_at, "unread": item.unread and item.recipient_id == user.id} for item in messages]


@app.get("/api/message-contacts")
def get_message_contacts(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    roles = ["talent", "candidate"] if user.role == "employer" else ["employer"]
    contacts = db.scalars(select(User).where(User.role.in_(roles), User.id != user.id).order_by(User.name)).all()
    return [{"id": contact.id, "name": contact.name, "email": contact.email, "role": contact.role} for contact in contacts]


@app.post("/api/messages")
def send_message(payload: MessageRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    recipient = db.get(User, payload.recipient_id)
    if not recipient or recipient.id == user.id:
        raise HTTPException(status_code=404, detail="Recipient not found")
    if user.role == "employer" and recipient.role not in {"talent", "candidate"}:
        raise HTTPException(status_code=403, detail="Employers can message candidates only")
    if user.role in {"talent", "candidate"} and recipient.role != "employer":
        raise HTTPException(status_code=403, detail="Candidates can message employers only")
    message = Message(sender_id=user.id, recipient_id=recipient.id, body=payload.body.strip(), sent_at="Just now", unread=True)
    db.add(message)
    db.add(Notification(user_id=recipient.id, text=f"New message from {user.name}.", time="Just now", type="message", unread=True))
    db.commit()
    return {"id": message.id, "message": "Message sent"}


@app.get("/api/notifications")
def get_notifications(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    notifications = db.scalars(select(Notification).where(Notification.user_id == user.id).order_by(Notification.id.desc())).all()
    return [{"id": item.id, "text": item.text, "time": item.time, "type": item.type, "unread": item.unread} for item in notifications]


@app.post("/api/notifications/{notification_id}/read")
def mark_notification_read(notification_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    notification = db.scalar(select(Notification).where(Notification.id == notification_id, Notification.user_id == user.id))
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    notification.unread = False
    db.commit()
    return {"message": "Notification marked as read"}


@app.get("/api/settings")
def get_settings(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return data_record(db, "settings", user.id)


@app.get("/api/admin/overview")
def get_admin_overview(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    total_applications = db.query(ApplicationModel).count()
    accepted = db.query(ApplicationModel).filter(ApplicationModel.status == "Accepted").count()
    pending = db.query(ApplicationModel).filter(ApplicationModel.status == "Pending").count()
    rejected = db.query(ApplicationModel).filter(ApplicationModel.status == "Rejected").count()
    return {"totalUsers": db.query(User).count(), "totalOpportunities": db.query(JobModel).count(), "totalApplications": total_applications, "totalRevenue": "$0", "usersGrowth": [], "applicationsByStatus": [{"name": "Accepted", "value": accepted, "color": "#5B3FD4"}, {"name": "Pending", "value": pending, "color": "#8B5CF6"}, {"name": "Rejected", "value": rejected, "color": "#F59E0B"}], "recentUsers": [{"id": item.id, "name": item.name, "email": item.email} for item in db.scalars(select(User).order_by(User.id.desc()).limit(8)).all()]}


@app.post("/api/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> dict:
    user = db.scalar(select(User).where(User.email == payload.email))
    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"message": "Login successful", "email": user.email, "token": create_token(user), "user": {"id": user.id, "name": user.name, "role": user.role}}


@app.post("/api/signup")
def signup(payload: SignupRequest, db: Session = Depends(get_db)) -> dict:
    if db.scalar(select(User).where(User.email == payload.email)):
        raise HTTPException(status_code=409, detail="Email is already registered")
    user = User(name=payload.fullName, email=payload.email, password=hash_password(payload.password), role=payload.role)
    db.add(user)
    db.commit()
    db.add(Notification(user_id=user.id, text="Welcome to SkillBridge. Complete your profile to get started.", time="Just now", type="account", unread=True))
    db.commit()
    return {"message": "Account created successfully", "fullName": user.name, "email": user.email, "role": user.role, "userId": user.id, "token": create_token(user)}


@app.post("/api/post-opportunity")
def post_opportunity(payload: OpportunityRequest, user: User = Depends(require_employer), db: Session = Depends(get_db)) -> dict:
    if isinstance(payload.skills, str):
        skills = [skill.strip() for skill in payload.skills.split(",") if skill.strip()]
    else:
        skills = payload.skills
    salary = payload.salary or " - ".join(value for value in [payload.salaryMin, payload.salaryMax] if value)
    job = JobModel(title=payload.title, company=payload.company or user.company or user.name, location=payload.location, type=payload.type or payload.jobType or "Full Time", experience=payload.experience, salary=salary, posted="just now", employer_id=user.id, skills=json.dumps(skills), deadline=payload.deadline, description=payload.description, requirements=json.dumps(payload.requirements))
    db.add(job)
    db.commit()
    db.refresh(job)
    return {"message": "Opportunity posted successfully", "job": job_response(job)}


@app.get("/api/categories")
def get_categories(db: Session = Depends(get_db)):
    return data_record(db, "categories")


@app.get("/api/companies")
def get_companies(db: Session = Depends(get_db)):
    return data_record(db, "companies")
