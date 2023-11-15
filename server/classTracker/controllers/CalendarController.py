from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Teacher_CS import Teacher_CS
from ..models.Classroom import Classroom
from ..models.Class_Subject import Class_Subject
from ..models.User import User

import datetime



calendarController = Blueprint('calendarController', __name__)

@calendarController.route("/getCalendarEvents", methods=["POST"])
def getCalendarEvents():
    selected_id = request.json["id"]
    classroom_data = []

    currentDate = datetime.datetime.now()

    if "teacher" in selected_id:
        selected_id = selected_id[8:]

        # teacher_cs_records = Teacher_CS.query.filter_by(teacher=selected_id).all()
        # classroom_ids = [record.id for record in teacher_cs_records]
        # classrooms = Classroom.query.filter(Classroom.tcs_id.in_(classroom_ids)).all()

        classrooms = (
            db.session.query(Classroom)
            .join(Teacher_CS, Classroom.tcs_id == Teacher_CS.id)
            .filter(Teacher_CS.teacher == selected_id)
            .all()
        )

        for classroom in classrooms:
            start_time = datetime.datetime.combine(classroom.day, classroom.begin)
            end_time = datetime.datetime.combine(classroom.day, classroom.end)
            classroom_color = "#a8c6a1" if currentDate > end_time else "#219ebc" if currentDate >= start_time else "#3d5a80"
            
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
            teacher = User.query.filter_by(id=classroom.teacher_cs.teacher).first()
            classroom_data.append({
                'id': classroom.id,
                'title': f"{classroom.teacher_cs.class_subject.subject.label} - {teacher.name} {teacher.surname}",
                'start': f"{classroom.day}T{classroom.begin}",
                'end': f"{classroom.day}T{classroom.end}",
                'color': '#507a96'
            })

    print("################ cs data", classroom_data)

    return jsonify(classroom_data)

