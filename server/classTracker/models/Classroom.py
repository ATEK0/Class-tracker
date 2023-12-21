from .. import db

class Classroom(db.Model):
    __tablename__ = 'classrooms'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    tcs_id = db.Column(db.Integer, db.ForeignKey('teachers_cs.id', ondelete='CASCADE'))
    day = db.Column(db.Date)
    begin = db.Column(db.Time)
    end = db.Column(db.Time)
    state = db.Column(db.String(255))

    teacher_cs = db.relationship('Teacher_CS')
