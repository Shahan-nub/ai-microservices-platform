import os

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from sqlalchemy.orm import Session

from ..services.pdf_service import (
    extract_text
)

# from ..services.gemini_service import (
#     analyze_resume
# )

from ..models import ResumeAnalysis

from ..db_dependency import get_db

from ..auth.auth_dependency import (
    get_current_user
)

from ..services.rabbitmq_service import (
    publish_resume_job
)

router = APIRouter()

@router.post("/analyze")
async def analyze(

    file: UploadFile = File(...),

    db: Session = Depends(get_db),

    current_user =
    Depends(get_current_user)

):

    temp_path = f"temp_{file.filename}"

    with open(
        temp_path,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    resume_text = extract_text(
        temp_path
    )

    # result = analyze_resume(
    #     resume_text
    # )

    os.remove(
        temp_path
    )

    # analysis = ResumeAnalysis(

    #     user_email=
    #     current_user["sub"],

    #     resume_text=
    #     resume_text,

    #     ats_score=80,

    #     analysis=result
    # )

    analysis = ResumeAnalysis(

    user_email=
    current_user["sub"],

    resume_text=
    resume_text,

    ats_score=0,

    analysis="",

    status="pending"
)

    db.add(
        analysis
    )

    db.commit()

    db.refresh(analysis)


    publish_resume_job({

    "analysis_id": analysis.id,

    "resume_text": resume_text,

    "user_email":
    current_user["sub"]
    })

    return {

    "job_id":
    analysis.id,

    "status":
    "pending"
}


@router.get("/history")
def history(

    db: Session = Depends(get_db),

    current_user =
    Depends(get_current_user)

):

    analyses = (

        db.query(
            ResumeAnalysis
        )

        .filter(
            ResumeAnalysis.user_email
            ==
            current_user["sub"]
        )

        .all()
    )

    return analyses