from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect, session

from .. import db

from ..models.User import User, isAdmin
from  ..models.Teacher import Teacher, isTeacher
from  ..models.Student import Student, isStudent
from  ..models.Class_ import Class_

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

