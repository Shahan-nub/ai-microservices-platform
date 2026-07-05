from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.db import Base


class ResumeAnalysis(Base):

    __tablename__ = "resume_analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_email = Column(
        String,
        nullable=False
    )

    resume_text = Column(
        Text,
        nullable=False
    )

    ats_score = Column(
        Integer
    )

    analysis = Column(
        Text
    )

    status = Column(
        String,
        default="pending"
    )