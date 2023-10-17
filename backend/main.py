from fastapi import FastAPI

# from models import User
from database import Base, engine
from routes.users import user_router
from routes.actions import action_router


Base.metadata.create_all(bind=engine)
# db = SessionLocal()
# user = User(login="init user 1", hashed_password="password123")
# db.add(user)
# db.commit()

app = FastAPI()
app.include_router(user_router)
app.include_router(action_router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
