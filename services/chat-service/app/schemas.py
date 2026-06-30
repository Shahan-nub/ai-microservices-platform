from pydantic import BaseModel

class ChatRequest(BaseModel):

    prompt: str




class ChatResponse(BaseModel):
    id: int
    user_email: str
    prompt: str
    response: str

    class Config:
        from_attributes = True