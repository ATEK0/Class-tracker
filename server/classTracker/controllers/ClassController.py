from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Class_Subject import Class_Subject
from ..models.Subject import Subject
from ..models.Class_ import Class_
from ..models.User import User, isAdmin

classController = Blueprint('classController', __name__)

@classController.route("/getClassSubjects", methods=["POST"])
def getClassSubjects():
    class_ = request.json["class_ID"]

    classSubjects = Class_Subject.query.filter_by(class_id = class_).all()

    subject_info = []
    for class_subject in classSubjects:
        subject = Subject.query.get(class_subject.subject_id)
        subject_info.append({
            "id": subject.id,
            "name": subject.label
        })
    print(subject_info)
    return jsonify(subject_info)
    
@classController.route("/getClasses", methods=["get"])
def getClasses():
    classes = Class_.query.all()

    class_info = [{
            "id": class_.id,
            "label": class_.label,
            "grade": class_.grade
        } for class_ in classes] 


    return jsonify(class_info)

@classController.route("/getClassesCount", methods=["GET"])
def getClassesCount():
    user_id = session.get("user_id")
    
    if isAdmin(user_id):
        count = Class_.query.count()
    # elif userType == "Teacher":
    else:
        count = 0 #retorna a contagem de turmas que o professor leciona

    #fazer igual para os outros endpoints do get...Count

    return jsonify(count)

@classController.route("/getClassStudents", methods=["GET"])
def getClassStudents():
    class_id = request.args.get("class_id")

    students = User.query.filter_by(class_id = class_id).all()

    student_info = [{
        "id": student.id,
        "name": student.name,
        "surname": student.surname
    } for student in students] 

    return (student_info)