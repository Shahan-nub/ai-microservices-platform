from fastapi import APIRouter, Depends, HTTPException

from ..schemas import ChatRequest, ChatResponse
from ..gemini_service import ask_gemini

from sqlalchemy.orm import Session
from google.api_core.exceptions import NotFound, ResourceExhausted

from ..models import Chat, Notification

from ..db_dependency import get_db

from ..auth.auth_dependency import (
    get_current_user
)


router = APIRouter()

@router.post("/")
def chat(
    req: ChatRequest,

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)
):

    try:
        answer = ask_gemini(req.prompt)
    except ResourceExhausted as exc:
        raise HTTPException(
            status_code=429,
            detail="The AI provider quota has been reached. Please try again later or check your Gemini API quota.",
        ) from exc
    except NotFound as exc:
        raise HTTPException(
            status_code=503,
            detail="The configured Gemini model is unavailable to this API project.",
        ) from exc

    chat = Chat(

        user_email=
        current_user["sub"],

        prompt=req.prompt,

        response=answer
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    try:
        db.add(Notification(
            user_email=current_user["sub"],
            event_key="chat-response:" + str(chat.id),
            title="Chat reply ready",
            description="Your assistant has finished responding to your message.",
            type="info",
            unread=True,
        ))
        db.commit()
    except Exception as exc:
        # A notification failure should not prevent the completed chat reply.
        db.rollback()
        print("Unable to save chat notification:", exc)

    return {
        "response": answer
    }


# Chat history 

# @router.get("/history")
@router.get(
    "/history",
    response_model=list[ChatResponse]
)

def history(

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    chats = (
        db.query(Chat)

        .filter(
            Chat.user_email ==
            current_user["sub"]
        )

        .all()
    )

    return chats