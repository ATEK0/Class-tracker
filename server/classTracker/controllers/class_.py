from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Class_Subject import Class_Subject
from ..models.Subject import Subject
from ..models.Class_ import Class_

class_subjects = Blueprint('class_subjects', __name__)

@class_subjects.route("/getClassSubjects", methods=["POST"])
def getClassSubjects():
    class_ = request.json["class"]

    classSubjects = Class_Subject.query.filter_by(class_id = class_).all()

    subject_info = []
    for class_subject in classSubjects:
        subject = Subject.query.get(class_subject.subject_id)
        subject_info.append({
            "name": subject.label,
            "id": subject.id
        })

    return jsonify({"subject_info": subject_info})
    
@class_subjects.route("/get_classes", methods=["get"])
def getClasses():
    classes = Class_.query.all()

    class_info = [{
            "id": class_.id,
            "label": class_.label,
            "grade": class_.grade
        } for class_ in classes] 


    return jsonify(class_info)
