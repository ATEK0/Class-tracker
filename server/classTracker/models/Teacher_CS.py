from .. import db

class Teacher_CS(db.Model):
    __tablename__ = 'teachers_cs'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.teacher_id', ondelete='CASCADE'))
    csid = db.Column(db.Integer, db.ForeignKey('classes_subjects.id', ondelete='CASCADE'))

    __table_args__ = (db.UniqueConstraint(teacher_id, csid),)

    teacher = db.relationship('Teacher')
    class_subject = db.relationship('Class_Subject')
