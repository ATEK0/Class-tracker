from .. import db

from ..models.User import User

def isTeacher(user_id):
    teacher = Teacher.query.get(user_id)
    return teacher

class Teacher(User, db.Model):
    __tablename__ = 'teachers'
    teacher_id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id', ondelete='CASCADE'))
    contact = db.Column(db.String(32))
    is_deleted = db.Column(db.Boolean, default=False)


    user = db.relationship("User")