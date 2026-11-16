import os

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
security = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> str:
    if credentials is None or not SECRET_KEY:
        raise HTTPException(status_code=401, detail="Authentication required")

    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid token") from exc

    email = payload.get("sub")
    if not isinstance(email, str) or not email:
        raise HTTPException(status_code=401, detail="Invalid token subject")
    return email
