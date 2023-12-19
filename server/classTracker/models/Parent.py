from .. import db

class Parent(db.Model):
    __tablename__ = 'parents'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    name = db.Column(db.String(300))
    phone = db.Column(db.String(32))
    email = db.Column(db.String(345))
    address = db.Column(db.String(120))