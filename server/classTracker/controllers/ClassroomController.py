from flask import Blueprint, request, jsonify, session

from .. import db

from ..models.Classroom import Classroom
from ..models.Class_Subject import Class_Subject
from ..models.Teacher_CS import Teacher_CS
from ..models.User import isAdmin
from ..models.Teacher import Teacher, isTeacher

classroomController = Blueprint('classroomController', __name__)

@classroomController.route("/createClassroom", methods=["POST"])
def createClassroom():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    user_id = request.json["teacher"]
    subject_id = request.json["subject"]
    class_ID = request.json["class_ID"]
    date = request.json["date"]
    beginTime = request.json["beginTime"]
    endTime = request.json["endTime"]

    classSubject = Class_Subject.query.filter_by(subject_id = subject_id, class_id = class_ID).first()
    teacher = Teacher.query.filter_by(user_id = user_id).first()
    teacherCS = Teacher_CS.query.filter_by(csid = classSubject.id, teacher_id = teacher.teacher_id).first()
    
    newClassroom = Classroom(tcs_id = teacherCS.id, day = date, begin = beginTime, end = endTime, state = "Teste")

    db.session.add(newClassroom)
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200