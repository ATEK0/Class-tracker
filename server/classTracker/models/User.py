from .. import db
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base

from uuid import uuid4

Base = declarative_base()


def get_uuid():
    return uuid4().hex

class User(Base, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(50))
    surname = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(345), unique=True)
    address = db.Column(db.String(100))
    birthdate = db.Column(db.Date)
    created_at = db.Column(db.String(30), default=lambda: datetime.now())
    state = db.Column(db.String(15), default="Ativo")