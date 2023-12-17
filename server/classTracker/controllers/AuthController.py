from flask import Blueprint, request, jsonify, session

from .. import db, bcrypt

from ..models.User import User, isAdmin
from ..models.Teacher import isTeacher
from ..models.Student import isStudent

authController = Blueprint('authController', __name__)


@authController.route("/@me", methods=["GET"])
def get_current_user():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=current_user).first()

    if isAdmin(user.id):
        userType = "Admin"
    elif isTeacher(user.id):
        userType = "Teacher"
    elif isStudent(user.id):
        userType = "Student"
    else:
        userType = "Undefined"

    return jsonify({
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "surname": user.surname,
        "type": userType,
        "image": user.image_path
    })


@authController.route('/register', methods=["POST"])
def register():
    name = request.json["name"]
    surname = request.json["surname"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first()

    if user_exists:
        return jsonify({"error": "Email already in use, please use another email"}), 409

    hashedPassword = bcrypt.generate_password_hash(password)
    newUser = User(name=name, surname=surname, email=email, password=hashedPassword)

    db.session.add(newUser)
    db.session.commit()

    session["user_id"] = newUser.id

    return jsonify({
        "id": newUser.id,
        "email": newUser.email,
    })


@authController.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first()

    if not user_exists or not bcrypt.check_password_hash(user_exists.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    else:
        session["user_id"] = user_exists.id

        return jsonify({
            "id": user_exists.id,
            "email": user_exists.email,
        })


@authController.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id")

    return jsonify({}), 200