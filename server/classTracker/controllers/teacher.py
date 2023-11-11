from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.User import User

teacherController = Blueprint('teacher', __name__)

@teacherController.route("/get_teachers", methods=["GET"])
def getTeachers():
    teachers = User.query.filter_by(type = 1).all()

    teachers_info = [{
            "id": teacher.id,
            "name": teacher.name,
            "surname": teacher.surname,
        } for teacher in teachers] 


    return jsonify(teachers_info)