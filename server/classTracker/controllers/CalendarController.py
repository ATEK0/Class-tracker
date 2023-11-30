from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Teacher_CS import Teacher_CS
from ..models.Classroom import Classroom
from ..models.Class_Subject import Class_Subject
from ..models.User import User
from ..models.Teacher import Teacher

import datetime



calendarController = Blueprint('calendarController', __name__)

@calendarController.route("/getCalendarEvents", methods=["POST"])
def getCalendarEvents():
    selected_id = request.json["id"]
    classroom_data = []

    currentDate = datetime.datetime.now()

    classroomState = [{"beforeColor":"#a8c6a1", "currentColor":"#219ebc", "afterColor":"#3d5a80"}]

    if "teacher" in selected_id:
        selected_id = selected_id[8:]

        teacher = Teacher.query.filter_by(user_id = selected_id).first()
        teacher_cs_records = Teacher_CS.query.filter_by(teacher_id=teacher.teacher_id).all()
        classroom_ids = [record.id for record in teacher_cs_records]
        classrooms = Classroom.query.filter(Classroom.tcs_id.in_(classroom_ids)).all()

        # classrooms = (
        #     db.session.query(Classroom)
        #     .join(Teacher_CS, Classroom.tcs_id == Teacher_CS.id)
        #     .filter(Teacher_CS.teacher_id == selected_id)
        #     .all()
        # )

        for classroom in classrooms:
            start_time = datetime.datetime.combine(classroom.day, classroom.begin)
            end_time = datetime.datetime.combine(classroom.day, classroom.end)
            classroom_color = classroomState[0] if currentDate > end_time else classroomState[1] if currentDate >= start_time else classroomState[2]
            
            classroom_data.append({
                'id': classroom.id,
                'title': f"{classroom.teacher_cs.class_subject.class_.grade}º{classroom.teacher_cs.class_subject.class_.label} - {classroom.teacher_cs.class_subject.subject.label}",
                'start': f"{classroom.day}T{classroom.begin}",
                'end': f"{classroom.day}T{classroom.end}",
                'color': classroom_color
            })

    elif "class" in selected_id:
        selected_id = selected_id[6:]

        classrooms = (
            db.session.query(Classroom)
            .join(Teacher_CS, Classroom.tcs_id == Teacher_CS.id)
            .join(Class_Subject, Teacher_CS.csid == Class_Subject.id)
            .filter(Class_Subject.class_id == selected_id)
            .all()
        )

        for classroom in classrooms:
            tcs = Teacher_CS.query.filter_by(id=classroom.teacher_cs.teacher_id).first()
            teacher = Teacher.query.filter_by(teacher_id = tcs.teacher_id).first()

            start_time = datetime.datetime.combine(classroom.day, classroom.begin)
            end_time = datetime.datetime.combine(classroom.day, classroom.end)
            classroom_color = classroomState[0] if currentDate > end_time else classroomState[1] if currentDate >= start_time else classroomState[2]

            classroom_data.append({
                'id': classroom.id,
                'title': f"{classroom.teacher_cs.class_subject.subject.label} - {teacher.name} {teacher.surname}",
                'start': f"{classroom.day}T{classroom.begin}",
                'end': f"{classroom.day}T{classroom.end}",
                'color': classroom_color
            })

    print("################ cs data", classroom_data)

    return jsonify(classroom_data)

