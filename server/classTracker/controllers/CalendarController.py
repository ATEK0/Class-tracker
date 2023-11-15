from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Teacher_CS import Teacher_CS
from ..models.Classroom import Classroom
from ..models.Class_Subject import Class_Subject



calendarController = Blueprint('calendarController', __name__)

@calendarController.route("/getCalendarEvents", methods=["POST"])
def getCalendarEvents():
    selected_id = request.json["id"]
    classroom_data = []

    if "teacher" in selected_id:
        selected_id = selected_id[8::]

        teacher_cs_records = Teacher_CS.query.filter_by(teacher=selected_id).all()

        classroom_ids = [teacher_cs_record.id for teacher_cs_record in teacher_cs_records]

        classrooms = Classroom.query.filter(Classroom.tcs_id.in_(classroom_ids)).all()


    elif "class" in selected_id:
        selected_id = selected_id[6::]

        class_subjects_records = Class_Subject.query.filter_by(class_id = selected_id).all()

        class_subject_ids = [class_subject_record.id for class_subject_record in class_subjects_records]

        teacher_cs_records = Teacher_CS.query.filter(Teacher_CS.csid.in_(class_subject_ids)).all()

        classroom_ids = [teacher_cs_record.id for teacher_cs_record in teacher_cs_records]

        classrooms = Classroom.query.filter(Classroom.tcs_id.in_(classroom_ids)).all()

        print(classrooms)

       

    for classroom in classrooms:
            classroom_data.append({
                'id': classroom.id,
                'title': f"{classroom.teacher_cs.class_subject.class_.grade}º{classroom.teacher_cs.class_subject.class_.label} - {classroom.teacher_cs.class_subject.subject.label}",
                'start': f"{classroom.day}T{classroom.begin}",
                'end': f"{classroom.day}T{classroom.end}",
                'color': 'green'
            })
    
    print("################ cs data", classroom_data)

    return jsonify(classroom_data)