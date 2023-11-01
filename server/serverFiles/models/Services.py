from .. import db

class Services(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable = False)
    descricao = db.Column(db.String(100), nullable = True)
    icon = db.Column(db.String(100), nullable = False)
    
    users = db.relationship('UserService', back_populates='service')

