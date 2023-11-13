from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Classroom import Classroom

classroomController = Blueprint('classroomController', __name__)

@classroomController.route("/createClassroom", methods=["POST"])
def createClassroom():

    teacher_id = request.json["teacher"]
    subject_id = request.json["subject"]
    class_ID = request.json["class_ID"]
    date = request.json["date"]
    beginTime = request.json["beginTime"]
    endTime = request.json["endTime"]


    # newClassroom = Summary(tcs_id = tcs_id, begin = begin, end = end, state = state)

    # db.session.add(newClassroom)
    # db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200