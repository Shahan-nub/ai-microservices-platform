from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .auth import get_current_user
from .db import get_db
from .models import Notification
from .schemas import NotificationCreate, NotificationResponse

router = APIRouter()


@router.get("/notifications", response_model=list[NotificationResponse])
def list_notifications(
    unread_only: bool = False,
    user_email: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = db.query(Notification).filter(Notification.user_email == user_email)
    if unread_only:
        query = query.filter(Notification.unread.is_(True))
    return query.order_by(Notification.created_at.desc(), Notification.id.desc()).limit(100).all()


@router.get("/notifications/unread-count")
def unread_count(
    user_email: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    count = (
        db.query(Notification)
        .filter(Notification.user_email == user_email, Notification.unread.is_(True))
        .count()
    )
    return {"count": count}


@router.post(
    "/notifications",
    response_model=NotificationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_notification(
    body: NotificationCreate,
    user_email: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if body.event_key:
        existing = (
            db.query(Notification)
            .filter(
                Notification.user_email == user_email,
                Notification.event_key == body.event_key,
            )
            .first()
        )
        if existing:
            return existing

    notification = Notification(
        user_email=user_email,
        event_key=body.event_key,
        title=body.title.strip(),
        description=body.description.strip(),
        type=body.type.value,
        unread=True,
    )
    db.add(notification)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        if body.event_key:
            existing = (
                db.query(Notification)
                .filter(
                    Notification.user_email == user_email,
                    Notification.event_key == body.event_key,
                )
                .first()
            )
            if existing:
                return existing
        raise

    db.refresh(notification)
    return notification


@router.patch("/notifications/read-all")
def mark_all_as_read(
    user_email: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    updated = (
        db.query(Notification)
        .filter(Notification.user_email == user_email, Notification.unread.is_(True))
        .update({Notification.unread: False}, synchronize_session=False)
    )
    db.commit()
    return {"updated": updated}


@router.patch("/notifications/{notification_id}/read", response_model=NotificationResponse)
def mark_as_read(
    notification_id: int,
    user_email: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_email == user_email,
        )
        .first()
    )
    if notification is None:
        raise HTTPException(status_code=404, detail="Notification not found")

    notification.unread = False
    db.commit()
    db.refresh(notification)
    return notification


@router.delete("/notifications/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_notification(
    notification_id: int,
    user_email: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_email == user_email,
        )
        .first()
    )
    if notification is None:
        raise HTTPException(status_code=404, detail="Notification not found")

    db.delete(notification)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
