from .. import db

class Class_Subject(db.Model):
    __tablename__ = 'classes_subjects'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id', ondelete='CASCADE'))
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id', ondelete='CASCADE'))
    is_deleted = db.Column(db.Boolean, default=False)

    __table_args__ = (db.UniqueConstraint(subject_id, class_id),)


    subject = db.relationship("Subject", back_populates="classes_subjects")
    class_ = db.relationship("Class_", back_populates="classes_subjects")
    teachers = db.relationship('Teacher_CS', back_populates='class_subject')