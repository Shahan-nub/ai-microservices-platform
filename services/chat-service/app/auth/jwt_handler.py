from jose import jwt
from jose import JWTError

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

def verify_token(token):

    try:

        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

    except JWTError:

        return None