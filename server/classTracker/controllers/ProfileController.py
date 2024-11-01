from flask import Blueprint, request, jsonify, send_file, session

from .. import db, bcrypt

from ..models.User import User, isAdmin
from ..models.Student import Student, isStudent
from ..models.Teacher import Teacher, isTeacher
from ..models.Class_ import Class_

import io
import os

profileController = Blueprint("profileController", __name__)


@profileController.route("/changeProfilePassword", methods=["POST"])
def changeProfilePassword():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    user = User.query.filter_by(id=current_user).first()

    current_password = request.json["current_password"]
    new_password = request.json["new_password"]

    if bcrypt.check_password_hash(user.password, current_password):
        if not bcrypt.check_password_hash(user.password, new_password):
            user.password = bcrypt.generate_password_hash(new_password)
            db.session.commit()
            return "Profile password successfully updated", 200
        else:
            return "Same Password", 203
    else:
        return "Wrong Password", 203


@profileController.route("/getProfileInfo", methods=["POST"])
def getProfileInfo():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    user_id = request.json["user_id"]

    user = User.query.filter_by(id=user_id).first()

    if user.birthdate:
        date = user.birthdate
        user.birthdate = str(date.day) + "/" + str(date.month) + "/" + str(date.year)

    user_info = {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "surname": user.surname,
        "birthdate": user.birthdate,
    }

    if isAdmin(user.id):
        user_info["userType"] = "Admin"
    elif isTeacher(user.id):
        teacher = Teacher.query.get(user.id)
        user_info["userType"] = "Teacher"

    elif isStudent(user.id):
        student = Student.query.get(user.id)

        class_ = Class_.query.get(student.class_id)

        teacher = Teacher.query.filter_by(teacher_id = class_.head_teacher).first()



        user_info["userType"] = "Student"
        user_info["pNumber"] = student.process_number
        user_info["class"] = str(class_.grade) + "º" + class_.label
        user_info["class_id"] = student.class_id
        user_info["headteacher"] = teacher.name + " " + teacher.surname
        user_info["headteacher_id"] = teacher.user_id

    else:
        user_info["userType"] = "Undefined"

    return jsonify(user_info)


@profileController.route("/updateProfileImage", methods=["POST"])
def updateProfileImage():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    user = User.query.filter_by(id=current_user).first()

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

    return "Profile image successfully updated", 200


@profileController.route("/getProfileImage/<path:userID>", methods=["GET", "POST"])
def getProfileImage(userID):
    if userID == "user":
        userID = session.get("user_id")

    user = User.query.filter_by(id=userID).first()

    if user and user.image_path:
        _, extension = os.path.splitext(user.image_path)
        mimetype = {
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
        }.get(extension.lower(), "application/octet-stream")

        return send_file(user.image_path, mimetype=mimetype)
    else:
        return send_file(
            "../profile_images/defaultProfileImage.png", mimetype="image/png"
        )
