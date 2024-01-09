from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.User import User, isAdmin
from ..models.Teacher import Teacher
from ..models.Class_Subject import Class_Subject
from ..models.Teacher_CS import Teacher_CS
from ..models.Class_ import Class_
from ..models.Subject import Subject

teacherController = Blueprint('teacher', __name__)


@teacherController.route('/getTeachersCount', methods=["GET"])
def getTeachersCount():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401
    
    if isAdmin(current_user):
        count = Teacher.query.count()

    return jsonify(count)

@teacherController.route("/getTeachers", methods=["GET"])
def getTeachers():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    teachers = Teacher.query.all()

    teachers_info = [{
            "id": teacher.id,
            "name": teacher.name + " " + teacher.surname,
            "contact": teacher.contact,
            "email": teacher.email,
            "state": teacher.state,
        } for teacher in teachers] 

    return jsonify(teachers_info)

@teacherController.route("/getTeacherInfo", methods=["POST"])
def getTeacherInfo():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401
    
    user_id = request.json["id"]

    teacher = Teacher.query.filter_by(user_id = user_id).first()
    teacher_cs_records = Teacher_CS.query.filter_by(teacher_id = teacher.teacher_id).all()
    csids = [record.csid for record in teacher_cs_records]

    class_ids_records = Class_Subject.query.filter(Class_Subject.id.in_(csids)).all()
    class_ids = [record.class_id for record in class_ids_records]
    class_ids = set(class_ids)

    classes = Class_.query.filter(Class_.id.in_(class_ids)).all()

    classes_list = [
        {
            "id": str(record.id),
            "label": str(record.grade) + "º " + record.label
        } for record in classes
    ]

    subject_ids_records = Class_Subject.query.filter(Class_Subject.id.in_(csids)).all()
    subject_ids = [record.subject_id for record in subject_ids_records]
    subject_ids = set(subject_ids)

    subjects = Subject.query.filter(Subject.id.in_(subject_ids)).all()

    subjects_list = [
        {
            "id": str(record.id),
            "label": record.label
        } for record in subjects
    ]

    teacher_info = {
        "id": teacher.id,
        "name": teacher.name,
        "surname": teacher.surname,
        "email": teacher.email,
        "state": teacher.state,
        "type": "Teacher",
        "address": teacher.address,
        "birthdate": teacher.birthdate,
        "contact": teacher.contact,
        "subjects": subjects_list,
        "classes": classes_list
    }

    return jsonify(teacher_info)

def parse_subjects(subjects_list):
    subjects_json = []
    for subject in subjects_list:
        id, label = subject.split(" ")
        subjects_json.append({
            "id": int(id),
            "label": label
        })
    return json.dumps(subjects_json)