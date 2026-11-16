from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, UniqueConstraint, func

from app.db import Base


class ResumeAnalysis(Base):
    __tablename__ = "resume_analysis"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, nullable=False)
    resume_text = Column(Text, nullable=False)
    ats_score = Column(Integer)
    analysis = Column(Text)
    status = Column(String, default="pending")


class Notification(Base):
    __tablename__ = "notifications"
    __table_args__ = (
        UniqueConstraint("user_email", "event_key", name="uq_notification_user_event"),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(320), nullable=False, index=True)
    event_key = Column(String(180), nullable=True)
    title = Column(String(180), nullable=False)
    description = Column(Text, nullable=False, default="")
    type = Column(String(16), nullable=False, default="info")
    unread = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
