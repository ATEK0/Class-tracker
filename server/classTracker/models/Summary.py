from .. import db
from sqlalchemy.dialects.mysql import LONGTEXT

class Summary(db.Model):
    __tablename__ = 'summaries'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50))
    content = db.Column(LONGTEXT)
    classroom_id = db.Column(db.Integer, db.ForeignKey('classrooms.id', ondelete='CASCADE'))

    classroom = db.relationship('Classroom')
    