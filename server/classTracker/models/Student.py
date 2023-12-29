from .. import db

from ..models.User import User
from ..models.Class_ import Class_
from ..models.Parent import Parent

def isStudent(user_id):
    student = Student.query.get(user_id)
    return student

class Student(User, db.Model):
    __tablename__ = 'students'
    student_id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id', ondelete='CASCADE'), unique=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'))
    process_number = db.Column(db.String(32), unique=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))

    user = db.relationship("User")