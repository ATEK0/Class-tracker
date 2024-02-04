from flask import Blueprint, request, jsonify, session

from .. import db

from ..models.Classroom import Classroom
from ..models.Class_Subject import Class_Subject
from ..models.Class_ import Class_
from ..models.Subject import Subject
from ..models.Student import Student
from ..models.Teacher_CS import Teacher_CS
from ..models.Summary import Summary
from ..models.User import isAdmin
from ..models.Teacher import Teacher, isTeacher
from ..models.Absence import Absence

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

    summary = Summary.query.filter_by(classroom_id=classroomID).first()

    absences = Absence.query.filter_by(classroom_id = classroomID).all()

    if summary is not None:
        content = summary.content
    else:
        content = None

    students_list = [{
        "id": record.user_id,
        "pNumber": record.process_number,
        "name": record.name + " " + record.surname 
    } for record in students]

    absences_list = [{
        "user_id": record.user_id,
        "presence": record.presence,
        "material": record.material,
        "late": record.late
    } for record in absences]

    date = classroom.day

    fDate = str(date.day) + "/" + str(date.month) + "/" + str(date.year)

    return jsonify({
        "day": fDate,
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
        "students": students_list,
        "summary": content,
        "absences": absences_list
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
    
    newClassroom = Classroom(tcs_id = teacherCS.id, day = date, begin = beginTime, end = endTime)

    db.session.add(newClassroom)
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200