from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.User import User, isAdmin
from ..models.Teacher import Teacher
from ..models.Class_Subject import Class_Subject

teacherController = Blueprint('teacher', __name__)


@teacherController.route('/getTeachersCount', methods=["GET"])
def getTeachersCount():

    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401
    
    if isAdmin(current_user):
        count = Teacher.query.count()

    return jsonify(count)

@teacherController.route("/getTeachers", methods=["GET"])
def getTeachers():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    teachers = Teacher.query.all()

    teachers_info = [{
            "id": teacher.id,
            "name": teacher.name + " " + teacher.surname,
            "contact": teacher.contact,
            "email": teacher.email,
            "state": teacher.state,
        } for teacher in teachers] 


    return jsonify(teachers_info)