from flask import Blueprint, request, jsonify, redirect, session

from .. import db, bcrypt

from ..models.User import User

import io
import os
from PIL import Image
import base64

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
    user = User.query.filter_by(id = user_id).first()

    image_data = request.files.get("image")

    print(image_data.filename)

    filename = f"{user_id}.png"

    try:
        with open(f"profile_images/{filename}", "wb") as f:
            f.write(image_data.read())
    except FileNotFoundError:
        os.makedirs("profile_images")
        with open(f"profile_images/{filename}", "wb") as f:
            f.write(image_data.read())

    user.image_path = f"profile_images/{filename}"
    db.session.commit()

    return ({"a": "a"})

@profileController.route("/getProfileImage", methods=["GET"])
def getProfileImage():

    user_id = session.get("user_id")
    user = User.query.filter_by(id = user_id).first()
    image_path = user.image_path

    if image_path:
        with open(image_path, 'rb') as f:
            image_data = f.read()
            return image_data
    else:
        return jsonify({"error": "No profile image found"}), 404
