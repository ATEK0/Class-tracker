from .. import db

class Class_(db.Model):
    __tablename__ = 'classes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label = db.Column(db.String(50))
    grade = db.Column(db.Integer)
    type_id = db.Column(db.Integer, db.ForeignKey("class_types.id"))