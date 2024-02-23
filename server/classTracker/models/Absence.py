from .. import db

class Absence(db.Model):
    __tablename__ = 'absences'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id', ondelete='CASCADE'))
    classroom_id = db.Column(db.Integer, db.ForeignKey('classrooms.id', ondelete='CASCADE'))
    presence = db.Column(db.Boolean, default=False)
    material = db.Column(db.Boolean, default=False)
    late = db.Column(db.Boolean, default=False)

    __table_args__ = (db.UniqueConstraint(user_id, classroom_id),)

    classroom = db.relationship('Classroom', back_populates='absence', uselist=False)
