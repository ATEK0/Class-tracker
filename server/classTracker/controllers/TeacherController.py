from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.User import User

teacherController = Blueprint('teacher', __name__)


@teacherController.route('/getTeachersCount', methods=["GET"])
def getTeachersCount():

    teachersCount = User.query.filter_by(type=1).count()
    return jsonify(teachersCount)

@teacherController.route("/getTeachers", methods=["GET"])
def getTeachers():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    teachers = User.query.filter_by(type = 1).all()

    teachers_info = [{
            "id": teacher.id,
            "name": teacher.name,
            "surname": teacher.surname,
        } for teacher in teachers] 


    return jsonify(teachers_info)