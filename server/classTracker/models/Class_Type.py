from .. import db

class Class_Type(db.Model):
    __tablename__ = 'class_types'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    label = db.Column(db.String(50))
    is_deleted = db.Column(db.Boolean, default=False)

    classes = db.relationship("Class_", back_populates="class_type")
