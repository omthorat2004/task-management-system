
import datetime
from typing import Optional
from jose import jwt
from src.core.constants import JWT_ALGORITHM, JWT_SECRET, ACCESS_TOKEN_EXPIRE_MINUTES


def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None) -> str:
    """
    Create a JWT access token.

    Args:
        data (dict): Payload data to encode in the token.
        expires_delta (Optional[timedelta]): Custom expiration time.

    Returns:
        str: Encoded JWT token as a string.
    """
    to_encode = data.copy()

    expire = datetime.datetime.now(datetime.timezone.utc) + (expires_delta or datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token
