from .. import db

class Class_(db.Model):
    __tablename__ = 'classes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label = db.Column(db.String(50))
    grade = db.Column(db.Integer)
    type_id = db.Column(db.Integer, db.ForeignKey("class_types.id", ondelete='CASCADE'))
    head_teacher = db.Column(db.Integer, db.ForeignKey("teachers.teacher_id", ondelete="SET NULL"))
    is_deleted = db.Column(db.Boolean, default=False)

    class_type = db.relationship("Class_Type", back_populates="classes")
    classes_subjects = db.relationship("Class_Subject", back_populates="class_")