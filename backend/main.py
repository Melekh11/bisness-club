from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routes.users import user_router
from routes.actions import action_router


Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(user_router)
app.include_router(action_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router)
app.include_router(action_router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
