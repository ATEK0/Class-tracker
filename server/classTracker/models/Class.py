from .. import db

class Class(db.Model):
    __tablename__ = 'classes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label = db.Column(db.String(50))
    grade = db.Column(db.Integer)
    type = db.Column(db.Integer)

    summaries = db.relationship('Summary', back_populates='class_')
    subjects = db.relationship('Subject', secondary='classes_subjects')
    