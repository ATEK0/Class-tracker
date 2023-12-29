from flask import Blueprint, request, jsonify, send_file, session

from .. import db, bcrypt

from ..models.User import User

import io
import os

profileController = Blueprint('profileController', __name__)


@profileController.route("/changeProfilePassword", methods=["POST"])
def changeProfilePassword():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id = current_user).first()
    
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
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id = current_user).first()

    image_data = request.files.get("image")

    filename = f"{user.id}.png"

    try:
        with open(f"profile_images/{filename}", "wb") as f:
            f.write(image_data.read())
    except FileNotFoundError:
        os.makedirs("profile_images")
        with open(f"profile_images/{filename}", "wb") as f:
            f.write(image_data.read())

    user.image_path = f"../profile_images/{filename}"
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200

@profileController.route("/getProfileImage/<path:userID>", methods=["GET", "POST"])
def getProfileImage(userID):
    if userID == 'user':
        userID = session.get("user_id")
        
    user = User.query.filter_by(id = userID).first()
    
    if user and user.image_path:
        _, extension = os.path.splitext(user.image_path)
        mimetype = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
        }.get(extension.lower(), 'application/octet-stream')

        return send_file(user.image_path, mimetype=mimetype)
    else:
        return send_file("../profile_images/defaultProfileImage.png", mimetype='image/png')