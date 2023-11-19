from .. import db

from ..models.User import User

class Teacher(User, db.Model):
    __tablename__ = 'teachers'
    teacher_id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'))
    contact = db.Column(db.String(32))

    users = db.relationship("User", back_populates="teachers")