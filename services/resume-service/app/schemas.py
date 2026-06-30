from pydantic import BaseModel

class ResumeHistoryResponse(BaseModel):

    id: int

    user_email: str

    ats_score: int

    analysis: str

    class Config:
        from_attributes = True