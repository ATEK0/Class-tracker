from .. import db

class Subject(db.Model):
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    label = db.Column(db.String(50))

    classes_subjects = db.relationship("Class_Subject", back_populates="subject")