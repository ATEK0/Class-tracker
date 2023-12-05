from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect, session
from flask_login import login_required, current_user, logout_user

from .. import db

from ..models.User import User, isAdmin
from  ..models.Teacher import Teacher, isTeacher
from  ..models.Student import Student, isStudent
from  ..models.Class_ import Class_

studentController = Blueprint('studentController', __name__)

@studentController.route('/getStudentsCount', methods=["GET"])
def getStudentsCount():
    user_id = session.get("user_id")
    
    if isAdmin(user_id):
        count = Student.query.count()
    elif isTeacher(user_id):
        ...
        
    return jsonify(count)

@studentController.route("/getStudents", methods=["GET"])
def getStudents():
    user_id = session.get("user_id")

    if not user_id:
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


