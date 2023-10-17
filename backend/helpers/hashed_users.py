import os
from hashlib import sha256

from helpers.crud import get_user_by_id
from fastapi import HTTPException


def decode_token(db, token):
    token_data = token.split(":")
    user_id = int(token_data[0])
    token_payload = token_data[1]
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials"
        )

    payload = user.login + os.environ["SECRET_SOULT"]
    if sha256(payload.encode('utf-8')).hexdigest() == token_payload:
        return user
    raise HTTPException(
        status_code=401,
        detail="Invalid authentication credentials"
    )


def encode_token(user):
    token_data = user.login + os.environ["SECRET_SOULT"]
    token = str(user.id) + ":" + sha256(token_data.encode('utf-8')).hexdigest()
    return token
