from fastapi import APIRouter, Depends

from helpers.get_time import get_current_time
from helpers.crud import get_user_by_login
from helpers.dependencies import get_db, get_user

action_router = APIRouter(
    prefix="/action"
)


@action_router.post("/decrement")
def decrement(
    user=Depends(get_user),
    db=Depends(get_db)
):
    user = get_user_by_login(db, user.login)
    user.counter -= 1
    db.commit()
    return "OK"


@action_router.post("/increment")
def increment(
    user=Depends(get_user),
    db=Depends(get_db)
):
    user = get_user_by_login(db, user.login)
    user.counter += 1
    db.commit()
    return "OK"


@action_router.get("/counter")
def get_counter(
    user=Depends(get_user),
    db=Depends(get_db)
):
    user = get_user_by_login(db, user.login)
    return user.counter


@action_router.patch("/new_action")
def update_action(
    user=Depends(get_user),
    db=Depends(get_db)
):
    user = get_user_by_login(db, user.login)
    user.last_action_time = get_current_time()
    db.commit()
    return "OK"
