from .. import db

class Teacher_CS(db.Model):
    __tablename__ = 'teachers_cs'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.teacher_id', ondelete='CASCADE'))
    csid = db.Column(db.Integer, db.ForeignKey('classes_subjects.id', ondelete='CASCADE'))
    is_deleted = db.Column(db.Boolean, default=False)

    __table_args__ = (db.UniqueConstraint(teacher_id, csid),)

    class_subject = db.relationship('Class_Subject', back_populates='teachers')
    classroom = db.relationship('Classroom', back_populates='teacher_cs')
