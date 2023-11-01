from .. import db

class UserService(db.Model):
    __tablename__ = 'user_services'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)

    # Define relationships back to User and Service models
    user = db.relationship('User', back_populates='services')
    service = db.relationship('Services', back_populates='users')