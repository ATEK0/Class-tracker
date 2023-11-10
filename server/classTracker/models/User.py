from .. import db
from flask_login import UserMixin
from datetime import datetime

from uuid import uuid4

def get_uuid():
    return uuid4().hex

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(50))
    surname = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.String(72), nullable=False)
    created_at = db.Column(db.String(30), default=lambda: datetime.now())
    state = db.Column(db.String(15), default="Ativo")
    type = db.Column(db.Integer, db.ForeignKey("user_types.id"))

    user_type = db.relationship("User_Type", back_populates="users")

    summaries = db.relationship("Summary", back_populates="teacher_")



    