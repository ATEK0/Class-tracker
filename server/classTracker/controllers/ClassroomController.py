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

classroomController = Blueprint("classroomController", __name__)


@classroomController.route("/getClassroomInfo", methods=["POST"])
def getClassroomInfo():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    classroomID = request.json["classroomID"]

    classroom = Classroom.query.filter_by(id=classroomID).first()

    tcs = Teacher_CS.query.filter_by(id=classroom.tcs_id).first()

    teacher = Teacher.query.filter_by(teacher_id=tcs.teacher_id).first()

    class_subject = Class_Subject.query.filter_by(id=tcs.csid).first()

    class_ = Class_.query.filter_by(id=class_subject.class_id).first()

    subject = Subject.query.filter_by(id=class_subject.subject_id).first()

    students = Student.query.filter_by(class_id=class_.id).all()

    summary = Summary.query.filter_by(classroom_id=classroomID).first()

    absences = Absence.query.filter_by(classroom_id=classroomID).all()

    if summary is not None:
        content = summary.content
    else:
        content = None

    students_list = [
        {
            "id": record.user_id,
            "pNumber": record.process_number,
            "name": record.name + " " + record.surname,
        }
        for record in students
    ]

    absences_list = {
        record.user_id: {
            "presence": record.presence,
            "material": record.material,
            "late": record.late,
        }
        for record in absences
    }

    date = classroom.day

    fDate = str(date.day) + "/" + str(date.month) + "/" + str(date.year)

    return jsonify(
        {
            "day": fDate,
            "begin": str(classroom.begin),
            "end": str(classroom.end),
            "teacher": {
                "id": teacher.user_id,
                "name": teacher.name + " " + teacher.surname,
            },
            "class": {
                "id": class_.id,
                "label": str(class_.grade) + "º " + class_.label,
            },
            "subject": {"id": subject.id, "label": subject.label},
            "students": students_list,
            "summary": content,
            "absences": absences_list,
        }
    )


@classroomController.route("/getClassrooms", methods=["GET"])
def getClassrooms():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    classrooms = Classroom.query.all()

    classrooms_list = []

    for classroom in classrooms:
        classroom = Classroom.query.filter_by(id=classroom.id).first()
        tcs = Teacher_CS.query.filter_by(id=classroom.tcs_id).first()
        teacher = Teacher.query.filter_by(teacher_id=tcs.teacher_id).first()
        class_subject = Class_Subject.query.filter_by(id=tcs.csid).first()
        class_ = Class_.query.filter_by(id=class_subject.class_id).first()
        subject = Subject.query.filter_by(id=class_subject.subject_id).first()
        date = classroom.day
        fDate = str(date.day) + "/" + str(date.month) + "/" + str(date.year)

        classrooms_list.append(
            {
                "classroomID": classroom.id,
                "day": fDate,
                "begin": str(classroom.begin),
                "end": str(classroom.end),
                "teacher": {
                    "id": teacher.user_id,
                    "name": teacher.name + " " + teacher.surname,
                },
                "class": {
                    "id": class_.id,
                    "label": str(class_.grade) + "º " + class_.label,
                },
                "subject": {"id": subject.id, "label": subject.label},
            }
        )

    return classrooms_list


@classroomController.route("/manageClassroom", methods=["POST"])
def manageClassroom():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    classroomID = request.json["classroomID"]
    summary = request.json["summary"]
    absences = request.json["absences"]

    summary_exists = Summary.query.filter_by(classroom_id=classroomID).first()

    if summary_exists is not None:
        summary_exists.content = summary
    else:
        newSummary = Summary(content=summary, classroom_id=classroomID)
        db.session.add(newSummary)

    for user_id, absence_list in absences.items():
        existing_absence = Absence.query.filter_by(user_id=user_id, classroom_id=classroomID).first()
        if existing_absence is not None:
            existing_absence.presence = "presence" in absence_list
            existing_absence.material = "material" in absence_list
            existing_absence.late = "late" in absence_list
        else:
            existing_absence = Absence(
                user_id=user_id,
                classroom_id=classroomID,
                presence="presence" in absence_list,
                material="material" in absence_list,
                late="late" in absence_list,
            )
            db.session.add(existing_absence)

    db.session.commit()

    return "Classroom successfully updated", 200



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

    classSubject = Class_Subject.query.filter_by(
        subject_id=subject_id, class_id=class_ID
    ).first()
    teacher = Teacher.query.filter_by(user_id=user_id).first()
    teacherCS = Teacher_CS.query.filter_by(
        csid=classSubject.id, teacher_id=teacher.teacher_id
    ).first()

    newClassroom = Classroom(
        tcs_id=teacherCS.id, day=date, begin=beginTime, end=endTime
    )

    db.session.add(newClassroom)
    db.session.commit()

    return jsonify({"message": "ok"}), 200


@classroomController.route("/editClassroom/<classroom_id>", methods=["POST"])
def editClassroom(classroom_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    user_id = request.json["teacher"]
    subject_id = request.json["subject"]
    class_ID = request.json["class_ID"]
    date = request.json["date"]
    beginTime = request.json["beginTime"]
    endTime = request.json["endTime"]

    classSubject = Class_Subject.query.filter_by(
        subject_id=subject_id, class_id=class_ID
    ).first()
    teacher = Teacher.query.filter_by(user_id=user_id).first()
    teacherCS = Teacher_CS.query.filter_by(
        csid=classSubject.id, teacher_id=teacher.teacher_id
    ).first()

    classroom = Classroom.query.get(classroom_id)

    if classroom:
        classroom.tcs_id = teacherCS.id
        classroom.day = date
        classroom.begin = beginTime
        classroom.end = endTime
        db.session.commit()
        return "Classroom successfully edited", 200
    else:
        return "Classroom not found", 404


@classroomController.route("/deleteClassroom/<classroom_id>", methods=["DELETE"])
def deleteClassroom(classroom_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    classroom = Classroom.query.get(classroom_id)

    if classroom:
        db.session.delete(classroom)
        db.session.commit()
        return "Classroom successfully deleted", 200
    else:
        return "Classroom not found", 404
