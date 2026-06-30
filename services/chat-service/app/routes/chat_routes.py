from fastapi import APIRouter, Depends 

from ..schemas import ChatRequest, ChatResponse
from ..gemini_service import ask_gemini

from sqlalchemy.orm import Session

from ..models import Chat

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

    answer = ask_gemini(
        req.prompt
    )

    chat = Chat(

        user_email=
        current_user["sub"],

        prompt=req.prompt,

        response=answer
    )

    db.add(chat)

    db.commit()

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