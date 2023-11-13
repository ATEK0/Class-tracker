from .. import db

class Classroom(db.Model):
    __tablename__ = 'classrooms'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    tcs_id = db.Column(db.Integer, db.ForeignKey('teachers_cs.id'))
    begin = db.Column(db.Date)
    end = db.Column(db.Date)
    state = db.Column(db.String(255))

    teacher_cs = db.relationship('Teacher_CS', back_populates='classroom')
    summary = db.relationship('Summary', back_populates='classroom')