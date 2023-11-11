from .. import db
from sqlalchemy.dialects.mysql import LONGTEXT

class Summary(db.Model):
    __tablename__ = 'summaries'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50))
    content = db.Column(LONGTEXT)
    csid = db.Column(db.Integer, db.ForeignKey('classes_subjects.id'))
    begin = db.Column(db.Date)
    end = db.Column(db.Date)
    state = db.Column(db.String(255))