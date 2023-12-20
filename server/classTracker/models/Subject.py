from .. import db

class Subject(db.Model):
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    label = db.Column(db.String(50))