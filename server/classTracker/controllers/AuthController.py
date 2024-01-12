from flask import Blueprint, request, jsonify, session

from .. import db, bcrypt

from ..models.User import User, isAdmin
from ..models.Teacher import Teacher, isTeacher
from ..models.Student import Student, isStudent
from ..models.Parent import Parent
from ..models.Class_ import Class_

authController = Blueprint('authController', __name__)


@authController.route("/@me", methods=["GET"])
def get_current_user():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    user = User.query.filter_by(id=current_user).first()

    user_info = {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "surname": user.surname,
        "address": user.address,
        "birthdate": user.birthdate,
        "image": user.image_path
    }

    if isAdmin(user.id):
        user_info["userType"] = "Admin"
    elif isTeacher(user.id):
        teacher = Teacher.query.get(user.id)
        user_info["userType"] = "Teacher"
        user_info["contact"] = teacher.contact
    elif isStudent(user.id):
        student = Student.query.get(user.id)
        parent = Parent.query.filter_by(id = student.parent_id).first()
        class_ = Class_.query.get(student.class_id)
        teacher = Teacher.query.filter_by(teacher_id = class_.head_teacher).first()
        user_info["userType"] = "Student"
        user_info["pNumber"] = student.process_number
        user_info["parentName"] = parent.name
        user_info["parentEmail"] = parent.email
        user_info["parentAddress"] = parent.address
        user_info["parentPhone"] = parent.phone
        user_info["className"] = str(class_.grade) + " º" + class_.label
        user_info["classType"] = class_.type_id
        user_info["classHeadTeacher"] = teacher.name + " " + teacher.surname

    else:
        user_info["userType"] = "Undefined"

    return jsonify(user_info)


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
        return "Unauthorized", 401

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