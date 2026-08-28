from __future__ import annotations

from datetime import datetime

from sqlalchemy import JSON, Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(30), default="candidate")
    title: Mapped[str] = mapped_column(String(120), default="Frontend Developer")
    location: Mapped[str] = mapped_column(String(120), default="Islamabad, Pakistan")
    availability: Mapped[str] = mapped_column(String(80), default="Open to work")
    bio: Mapped[str] = mapped_column(Text, default="")
    skills: Mapped[str] = mapped_column(Text, default="")
    experience: Mapped[str] = mapped_column(Text, default="")
    education: Mapped[str] = mapped_column(Text, default="")
    company: Mapped[str] = mapped_column(String(160), default="")

    applications: Mapped[list[Application]] = relationship(back_populates="user")
    saved_jobs: Mapped[list[SavedJob]] = relationship(back_populates="user")


class Job(Base):
    __tablename__ = "jobs"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(160))
    company: Mapped[str] = mapped_column(String(160))
    location: Mapped[str] = mapped_column(String(120))
    type: Mapped[str] = mapped_column(String(60))
    experience: Mapped[str] = mapped_column(String(60))
    salary: Mapped[str] = mapped_column(String(100))
    posted: Mapped[str] = mapped_column(String(80))
    skills: Mapped[str] = mapped_column(Text, default="")
    deadline: Mapped[str] = mapped_column(String(80))
    description: Mapped[str] = mapped_column(Text)
    requirements: Mapped[str] = mapped_column(Text, default="")
    employer_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True, index=True)

    applications: Mapped[list[Application]] = relationship(back_populates="job")


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(160))
    company: Mapped[str] = mapped_column(String(160))
    applied_date: Mapped[str] = mapped_column(String(80))
    status: Mapped[str] = mapped_column(String(40), default="Pending")
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    job_id: Mapped[int | None] = mapped_column(ForeignKey("jobs.id"), nullable=True)

    user: Mapped[User | None] = relationship(back_populates="applications")
    job: Mapped[Job | None] = relationship(back_populates="applications")


class SavedJob(Base):
    __tablename__ = "saved_jobs"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(160))
    company: Mapped[str] = mapped_column(String(160))
    salary: Mapped[str] = mapped_column(String(100))
    location: Mapped[str] = mapped_column(String(120))
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    job_id: Mapped[int | None] = mapped_column(ForeignKey("jobs.id"), nullable=True, index=True)

    user: Mapped[User | None] = relationship(back_populates="saved_jobs")


class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    text: Mapped[str] = mapped_column(Text)
    time: Mapped[str] = mapped_column(String(80))
    type: Mapped[str] = mapped_column(String(40))
    unread: Mapped[bool] = mapped_column(Boolean, default=True)


class Message(Base):
    __tablename__ = "chat_messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    sender_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    recipient_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    body: Mapped[str] = mapped_column(Text)
    sent_at: Mapped[str] = mapped_column(String(80))
    unread: Mapped[bool] = mapped_column(Boolean, default=True)


class AppData(Base):
    __tablename__ = "app_data"

    id: Mapped[int] = mapped_column(primary_key=True)
    data_type: Mapped[str] = mapped_column(String(50), index=True)
    data: Mapped[dict | list] = mapped_column(JSON)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True, index=True)