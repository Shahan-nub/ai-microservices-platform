from jose import jwt
from jose import JWTError
from datetime import datetime
from datetime import timedelta

from .config import SECRET_KEY
from .config import ALGORITHM

def create_access_token(data: dict):

    payload = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=30
    )

    payload.update(
        {"exp": expire}
    )

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )




SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

def verify_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:

        return None