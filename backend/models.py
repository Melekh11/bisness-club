from sqlalchemy import Column, Integer, String

from database import Base
from helpers.get_time import get_current_time


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    login = Column(String, index=True, unique=True)
    hashed_password = Column(String)

    counter = Column(Integer, default=0)
    last_action_time = Column(String, default=get_current_time)
