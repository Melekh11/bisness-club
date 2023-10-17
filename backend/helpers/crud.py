from hashlib import sha256

from models import User


def create_hash(text):
    return sha256(text.encode('utf-8')).hexdigest()


def get_user_by_login(db, login):
    return db.query(User).filter(User.login == login).first()


def get_user_by_id(db, id):
    return db.query(User).filter(User.id == id).first()
