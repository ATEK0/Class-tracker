from flask import Blueprint, request, jsonify, redirect, session

from .. import db, bcrypt

from ..models.User import User

profileController = Blueprint('profileController', __name__)

@profileController.route("/changeProfilePassword", methods=["POST"])
def changeProfilePassword():

    user_id = session.get("user_id")

    user = User.query.filter_by(id = user_id).first()
    
    current_password = request.json["current_password"]
    new_password = request.json["new_password"]

    if (bcrypt.check_password_hash(user.password, current_password)):
        if(not bcrypt.check_password_hash(user.password, new_password)):
            user.password = bcrypt.generate_password_hash(new_password)
            db.session.commit()
            return jsonify ({"message": "ok"}), 200
        else:
            return jsonify({"error": "Same Password"})
    else:
        return jsonify({"error": "Wrong Password"})

@profileController.route("/updateProfileImage", methods=["POST"])
def updateProfileImage():

    user_id = session.get("user_id")

    image_data = request.json["image"]

    return ({"a": "a"})