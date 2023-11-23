from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Subject import Subject
from ..models.Class_Subject import Class_Subject
from ..models.User import User, isAdmin

subjectController = Blueprint('subjectController', __name__)

@subjectController.route('/getSubjectCount', methods=["GET"])
def getSubjectCount():
    user_id = session.get("user_id")
    
    if isAdmin(user_id):
        subjectCount = Subject.query.count()
    # elif userType == "Teacher":
    #     ...

    return jsonify(subjectCount)

@subjectController.route("/get_subject", methods=["get"])
def getSubject():
    subjects = Subject.query.all()

    subjects_info = [{
            "id": subject.id,
            "label": subject.label,
        } for subject in subjects] 


    return jsonify(subjects_info)

@subjectController.route("/getSubjectTeachers", methods=["POST"])
def getSubjectTeachers():
    try:
        class_id = int(request.json["class_ID"])
        subject_id = int(request.json["subject"])
    except Exception as e:
        return jsonify({"error": e})

    class_subject = Class_Subject.query.filter_by(class_id=class_id, subject_id=subject_id).first()

    teacher_ids = [teacher_cs.teacher for teacher_cs in class_subject.teachers]

    teacher_info = []
    for teacher_id in teacher_ids:
        teacher = User.query.get(teacher_id)
        teacher_info.append({
            "id": teacher.id,
            "name": teacher.name,
            "surname": teacher.surname
        })

    return jsonify(teacher_info)


    
