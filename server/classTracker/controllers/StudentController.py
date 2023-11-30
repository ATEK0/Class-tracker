from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect, session
from flask_login import login_required, current_user, logout_user

from .. import db

from ..models.User import User, isAdmin
from  ..models.Teacher import Teacher, isTeacher
from  ..models.Student import Student, isStudent

studentController = Blueprint('studentController', __name__)

@studentController.route('/getStudentsCount', methods=["GET"])
def getStudentsCount():
    user_id = session.get("user_id")
    
    if isAdmin(user_id):
        count = Teacher.query.count()
    elif isTeacher(user_id):
        ...
        
    return jsonify(count)

@studentController.route("/getStudents", methods=["GET"])
def getStudents():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    students = Student.query.all()

    students_info = [{
            "id": student.id,
            "name": student.name + " " + student.surname,
            "email": student.email,
            "class": student.class_id,
            "process": student.process_number
        } for student in students] 


    return jsonify(students_info)


