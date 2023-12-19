from flask import Blueprint, request, jsonify, send_file, session

from .. import db, bcrypt

from ..models.User import User, isAdmin
from  ..models.Teacher import Teacher, isTeacher
from  ..models.Student import Student, isStudent
from  ..models.Class_ import Class_
from  ..models.Parent import Parent

studentController = Blueprint('studentController', __name__)


@studentController.route('/getStudentsCount', methods=["GET"])
def getStudentsCount():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401
    
    if isAdmin(current_user):
        count = Student.query.count()
    elif isTeacher(current_user):
        ...
        
    return jsonify(count)

@studentController.route("/getStudents", methods=["GET"])
def getStudents():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    students = Student.query.all()

    students_info = []
    for student in students:
        class_info = Class_.query.get(student.class_id)
        students_info.append({
            "id": student.id,
            "name": student.name + " " + student.surname,
            "email": student.email,
            "class_id": student.class_id,
            "class": str(class_info.grade) + "º " + class_info.label,
            "process": student.process_number
        })

    return jsonify(students_info)


@studentController.route("/getStudentInfo", methods=["POST"])
def getStudentInfo():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401
    
    user_id = request.json["id"]

    student = Student.query.filter_by(id = user_id).first()
    class_info = Class_.query.get(student.class_id)

    students_info = {
            "id": student.id,
            "name": student.name,
            "surname": student.surname,
            "email": student.email,
            "state": student.state,
            "type": "Student",
            "class_id": student.class_id,
            "address": student.address,
            "birthdate": student.birthdate,
            "class": str(class_info.grade) + class_info.label,
            "class_director": "Pra já nada",
            "process": student.process_number
        }

    return jsonify(students_info)

@studentController.route("/createStudent", methods=["POST"])
def createStudent():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    name = request.json["firstName"]
    surname = request.json["lastName"]
    password = request.json["password"]
    email = request.json["email"]
    address = request.json["address"]
    birthdate = request.json["birthdate"]
    processNumber = request.json["pNumber"]
    parentName = request.json["parentName"]
    parentPhone = request.json["parentPhone"]
    parentEmail = request.json["parentEmail"]
    parentAddress = request.json["parentAddress"]
    class_id = request.json["class_ID"]

    user_exists = User.query.filter_by(email=email).first()

    if user_exists:
        return jsonify({"error": "Email already in use, please use another email"}), 409

    hashedPassword = bcrypt.generate_password_hash(password)

    newUser = User(name = name, surname = surname, email = email, password = hashedPassword, address = address, birthdate = birthdate)

    db.session.add(newUser)
    db.session.commit()

    newParent = Parent(name = parentName, phone = parentPhone, email = parentEmail, address = parentAddress)

    db.session.add(newParent)
    db.session.commit()

    newStudent = Student(user_id = newUser.id, parent_id = newParent.id, process_number = processNumber, class_id = class_id)

    db.session.add(newStudent)
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200