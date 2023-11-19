from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Classroom import Classroom
from ..models.Class_Subject import Class_Subject
from ..models.Teacher_CS import Teacher_CS

classroomController = Blueprint('classroomController', __name__)

@classroomController.route("/createClassroom", methods=["POST"])
def createClassroom():

    teacher_id = request.json["teacher"]
    subject_id = request.json["subject"]
    class_ID = request.json["class_ID"]
    date = request.json["date"]
    beginTime = request.json["beginTime"]
    endTime = request.json["endTime"]

    classSubject = Class_Subject.query.filter_by(subject_id = subject_id, class_id = class_ID).first()
    teacherCS = Teacher_CS.query.filter_by(csid = classSubject.id, teacher = teacher_id).first()
    
    newClassroom = Classroom(tcs_id = teacherCS.id, day = date, begin = beginTime, end = endTime, state = "Teste")

    db.session.add(newClassroom)
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200


@classroomController.route("/getClassroomsCount", methods=["GET"])
def getClassroomsCount():

    userType = request.args.get("type")
    user_id = session.get("user_id")

    if userType == "Admin":
        count = Classroom.query.count()
    elif userType == "Teacher":
        ... #retorna a contagem de turmas que o professor leciona

    #fazer igual para os outros endpoints do get...Count

    return jsonify(count)