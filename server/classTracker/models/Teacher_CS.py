from .. import db

class Teacher_CS(db.Model):
    __tablename__ = 'teachers_cs'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    teacher = db.Column(db.String(32), db.ForeignKey('users.id'))
    csid = db.Column(db.Integer, db.ForeignKey('classes_subjects.id'))

    __table_args__ = (db.UniqueConstraint(teacher, csid),)

    teacher_ = db.relationship('User', back_populates='teaching_cs')
    class_subject = db.relationship('Class_Subject', back_populates='teachers')
