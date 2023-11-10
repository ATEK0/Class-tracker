from .. import db

class Subject(db.Model):
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    label = db.Column(db.String(50))

    classes = db.relationship('Class', secondary='classes_subjects', back_populates='subjects')