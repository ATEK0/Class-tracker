from flask import Blueprint, request, jsonify, session

from .. import db

from ..models.Classroom import Classroom
from ..models.Class_Subject import Class_Subject
from ..models.Class_ import Class_
from ..models.Subject import Subject
from ..models.Student import Student
from ..models.Teacher_CS import Teacher_CS
from ..models.User import isAdmin
from ..models.Teacher import Teacher, isTeacher

classroomController = Blueprint('classroomController', __name__)

@classroomController.route("/getClassroomInfo", methods=["POST"])
def getClassroomInfo():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    classroomID = request.json["classroomID"]

    classroom = Classroom.query.filter_by(id = classroomID).first()

    tcs = Teacher_CS.query.filter_by(id = classroom.tcs_id).first()

    teacher = Teacher.query.filter_by(teacher_id = tcs.teacher_id).first()

    class_subject = Class_Subject.query.filter_by(id = tcs.csid).first()

    class_ = Class_.query.filter_by(id = class_subject.class_id).first()

    subject = Subject.query.filter_by(id = class_subject.subject_id).first()

    students = Student.query.filter_by(class_id = class_.id).all()

    students_list = [{
        "id": record.user_id,
        "pNumber": record.process_number,
        "name": record.name + " " + record.surname 
    } for record in students]

    return jsonify({
        "day": classroom.day,
        "begin": str(classroom.begin),
        "end": str(classroom.end),
        "teacher": {
            "id": teacher.user_id,
            "name": teacher.name + " " + teacher.surname,
        },
        "class": {
            "id": class_.id,
            "label": str(class_.grade) + "º " + class_.label
        },
        "subject": {
            "id": subject.id,
            "label": subject.label
        },
        "students": students_list
    })



@classroomController.route("/createClassroom", methods=["POST"])
def createClassroom():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

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