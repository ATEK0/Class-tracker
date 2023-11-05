from .. import db
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    surname = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(150))
    password = db.Column(db.String(88))
    criado = db.Column(db.String(30), default=lambda: datetime.now())
    estado = db.Column(db.String(15), default="Ativo")


    