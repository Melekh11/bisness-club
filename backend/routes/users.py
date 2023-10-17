from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException
from pydantic import BaseModel

from helpers.hashed_users import encode_token
from models import User
from helpers.crud import create_hash, get_user_by_login
from helpers.dependencies import get_db


user_router = APIRouter(
  prefix="/user",
)


class UserModel(BaseModel):
    login: str
    password: str


@user_router.post("/auth")
async def auth(
    user_data: Annotated[UserModel, Body()],
    db=Depends(get_db)
):
    same_login_user = get_user_by_login(db, user_data.login)
    if same_login_user:
        raise HTTPException(status_code=400, detail="user exist")

    new_user = User(login=user_data.login,
                    hashed_password=create_hash(user_data.password))
    db.add(new_user)
    db.commit()

    token_str = encode_token(new_user)
    token = {"access_token": token_str, "token_type": "bearer"}
    return token


@user_router.post("/login")
async def login(
    user_data: Annotated[UserModel, Body()],
    db=Depends(get_db)
):
    user = get_user_by_login(db, user_data.login)
    if not user:
        raise HTTPException(status_code=400, detail="no user with that login")

    if user.hashed_password != create_hash(user_data.password):
        raise HTTPException(status_code=400, detail="wrong password")

    token_str = encode_token(user)
    token = {"access_token": token_str, "token_type": "bearer"}
    return token
