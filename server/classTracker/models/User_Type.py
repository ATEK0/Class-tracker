from .. import db

class User_Type(db.Model):
    __tablename__ = 'user_types'
    id = db.Column(db.Integer, primary_key=True, unique=True, auto_increment=True)
    label = db.Column(db.String(50))
