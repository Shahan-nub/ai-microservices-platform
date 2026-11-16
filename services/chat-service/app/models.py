from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Boolean, DateTime, UniqueConstraint, func

from .db import Base

class Chat(Base):

    __tablename__ = "chats"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_email = Column(
        String,
        nullable=False
    )

    prompt = Column(
        Text,
        nullable=False
    )

    response = Column(
        Text,
        nullable=False
    )

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
