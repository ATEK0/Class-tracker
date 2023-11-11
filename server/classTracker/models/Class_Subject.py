from .. import db

class Class_Subject(db.Model):
    __tablename__ = 'classes_subjects'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))
    teacher = db.Column(db.String(32), db.ForeignKey('users.id'))

    subject = db.relationship("Subject", back_populates="classes_subjects")
    class_ = db.relationship("Class_", back_populates="classes_subjects")
    teacher_ = db.relationship("User", back_populates="classes_subjects_taught")