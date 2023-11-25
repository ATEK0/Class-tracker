from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.User import User, isAdmin
from ..models.Teacher import Teacher
from ..models.Class_Subject import Class_Subject

teacherController = Blueprint('teacher', __name__)


@teacherController.route('/getTeachersCount', methods=["GET"])
def getTeachersCount():

    user_id = session.get("user_id")
    
    if isAdmin(user_id):
        count = Teacher.query.count()

    return jsonify(count)

@teacherController.route("/getTeachers", methods=["GET"])
def getTeachers():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    teachers = Teacher.query.all()

    teachers_info = [{
            "id": teacher.id,
            "name": teacher.name,
            "surname": teacher.surname,
        } for teacher in teachers] 


    return jsonify(teachers_info)

@teacherController.route("/teste", methods=["GET"])
def teste():
    
    classSubject = Class_Subject.query.all()

    resposta = [
         {
            "coiso": class_subject2.teacher
         }  for class_subject2 in classSubject
    ]

    return jsonify(resposta)