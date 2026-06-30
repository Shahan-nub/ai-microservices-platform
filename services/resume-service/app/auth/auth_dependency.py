from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from .jwt_handler import verify_token

security = HTTPBearer()

def get_current_user(
    credentials:
    HTTPAuthorizationCredentials
    = Depends(security)
):

    payload = verify_token(
        credentials.credentials
    )

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return payload