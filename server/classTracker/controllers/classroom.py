from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Classroom import Classroom

classroomController = Blueprint('classroomController', __name__)

@classroomController.route("/createClassroom", methods=["POST"])
def createClassroom():
    tcs_id = request.json["tcs_ID"]
    begin = request.json["begin"]
    end = request.json["end"]
    state = request.json["state"]

    newClassroom = Summary(tcs_id = tcs_id, begin = begin, end = end, state = state)

    db.session.add(newClassroom)
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200