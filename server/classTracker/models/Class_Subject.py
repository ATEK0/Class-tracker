from .. import db

class Class_Subject(db.Model):
    __tablename__ = 'classes_subjects'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))

    class_id = db.relationship('Class', back_populates='subjects')
    subject = db.relationship('Subject', back_populates='classes')

    summaries = db.relationship('Summary', back_populates='class_subject')