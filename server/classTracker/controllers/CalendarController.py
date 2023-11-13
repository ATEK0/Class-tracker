from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Teacher_CS import Teacher_CS
from ..models.Classroom import Classroom

calendarController = Blueprint('calendarController', __name__)

@calendarController.route("/getCalendarEvents", methods=["POST"])
def getCalendarEvents():
    teacher_id = request.json["teacher_id"]

    # Retrieve all `Teacher_CS` records associated with the specified teacher
    teacher_cs_records = Teacher_CS.query.filter_by(teacher=teacher_id).all()

    # Extract classroom IDs from the `Teacher_CS` records
    classroom_ids = [teacher_cs_record.id for teacher_cs_record in teacher_cs_records]

    # Query for classrooms with the extracted IDs
    classrooms = Classroom.query.filter(Classroom.id.in_(classroom_ids)).all()

    # Convert retrieved classroom objects to a list of dictionaries
    classroom_data = []
    for classroom in classrooms:
        classroom_data.append({
            'id': classroom.id,
            'title': f"{classroom.teacher_cs.class_subject.class_.grade}º{classroom.teacher_cs.class_subject.class_.label} - {classroom.teacher_cs.class_subject.subject.label}",
            'start': f"{classroom.day}T{classroom.begin}",
            'end': f"{classroom.day}T{classroom.end}",
            'color': 'red'
        })

    # Return the classroom data as JSON
    return jsonify({'classrooms': classroom_data})