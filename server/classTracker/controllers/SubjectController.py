from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Subject import Subject
from ..models.Class_Subject import Class_Subject
from ..models.Teacher_CS import Teacher_CS
from ..models.User import User, isAdmin
from ..models.Teacher import Teacher, isTeacher

subjectController = Blueprint('subjectController', __name__)

@subjectController.route('/getSubjectCount', methods=["GET"])
def getSubjectCount():
    user_id = session.get("user_id")
    
    if isAdmin(user_id):
        subjectCount = Subject.query.count()
    elif isTeacher(user_id):
        ...

    return jsonify(subjectCount)

@subjectController.route("/getSubject", methods=["GET"])
def getSubject():
    subjects = Subject.query.all()

    subjects_info = [{
            "id": subject.id,
            "label": subject.label,
        } for subject in subjects] 


    return jsonify(subjects_info)

@subjectController.route("/getSubjectTeachers", methods=["POST"])
def getSubjectTeachers():

    class_id = request.json["class_ID"]
    subject_id = request.json["subject"]

    print(class_id)
    print(subject_id)

    class_subject = Class_Subject.query.filter_by(class_id=class_id, subject_id=subject_id).first()

    tcs = Teacher_CS.query.filter_by(csid = class_subject.id).all()

    teacher_ids = [record.teacher_id for record in tcs]

    teacher = Teacher.query.filter(Teacher.teacher_id.in_(teacher_ids)).all()

    teacher_info = [{
            "id": teacher.id,
            "name": teacher.name,
            "surname": teacher.surname,
        } for teacher in teacher] 

    return jsonify(teacher_info)

@subjectController.route("/createSubject", methods=["POST"])
def createSubject():
    label = request.json["label"]

    newSubject = Subject(label = label)

    db.session.add(newSubject)
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200

@subjectController.route('/deleteSubject/<int:subject_id>', methods=['DELETE'])
def deleteSubject(subject_id):
    subject = Subject.query.get(subject_id)

    if subject:
        db.session.delete(subject)
        db.session.commit()
        return jsonify({"message": "ok"}), 200
    else:
        return jsonify({"message": "Subject not found"}), 404
    
@subjectController.route('/editSubject/<int:subject_id>', methods=['POST'])
def editSubject(subject_id):

    label = request.json['label']

    subject = Subject.query.get(subject_id)

    if subject:
        subject.label = label
        db.session.commit()
        return jsonify({"message": "ok"}), 200
    else:
        return jsonify({"message": "Subject not found"}), 404
    
