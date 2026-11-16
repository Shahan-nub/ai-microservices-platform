from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, Field


class NotificationType(str, Enum):
    success = "success"
    info = "info"
    warning = "warning"


class NotificationCreate(BaseModel):
    title: str = Field(min_length=1, max_length=180)
    description: str = Field(default="", max_length=4000)
    type: NotificationType = NotificationType.info
    event_key: str | None = Field(default=None, max_length=180)


class NotificationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    type: NotificationType
    unread: bool
    created_at: datetime
