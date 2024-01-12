from flask import Blueprint, request, jsonify, send_file, session

from .. import db

from ..models.User import User, isAdmin

userController = Blueprint('userController', __name__)

@userController.route('/deleteUser/<user_id>', methods=['DELETE'])
def deleteUser(user_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    user = User.query.filter_by(id = user_id).first()

    if user:
        db.session.delete(user)
        db.session.commit()
        return "User successfully deleted", 200
    else:
        return "User not found", 404

@userController.route('/editUser/<user_id>', methods=['POST'])
def editUser(user_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    name = request.json['name']
    surname = request.json['surname']
    email = request.json['email']
    address = request.json['address']
    birthdate = request.json['birthdate']
    state = request.json['state']

    user = User.query.get(user_id)

    if user:
        user.name = name
        user.surname = surname
        user.email = email
        user.address = address
        user.birthdate = birthdate
        user.state = state
        db.session.commit()
        return "User successfully edited", 200
    else:
        return "User not found", 404