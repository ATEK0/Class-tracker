from .. import db

from ..models.User import User

class Student(User, db.Model):
    __tablename__ = 'students'
    student_id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), unique=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'))
    process_number = db.Column(db.String(32))
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))