from flask import Blueprint, request, jsonify, session

from .. import db

from ..models.Class_Subject import Class_Subject
from ..models.Subject import Subject
from ..models.Class_ import Class_
from ..models.User import User, isAdmin
from ..models.Student import Student
from ..models.Teacher import Teacher, isTeacher
from ..models.Teacher_CS import Teacher_CS

classController = Blueprint('classController', __name__)


@classController.route("/getClassSubjects", methods=["POST"])
def getClassSubjects():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    class_ = request.json["class_ID"]

    classSubjects = Class_Subject.query.filter_by(class_id = class_).all()

    subject_info = []
    for class_subject in classSubjects:
        subject = Subject.query.get(class_subject.subject_id)
        subject_info.append({
            "id": subject.id,
            "name": subject.label
        })

    return jsonify(subject_info)
    
@classController.route("/getClasses", methods=["get"])
def getClasses():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    classes = Class_.query.all()

    class_info = []
    for class_ in classes:
        teacher = Teacher.query.filter_by(teacher_id = class_.head_teacher).first()
        class_info.append({
            "id": class_.id,
            "label": class_.label,
            "grade": class_.grade,
            "name": teacher.name + " " + teacher.surname
        })

    return jsonify(class_info)

@classController.route("/getClassesCount", methods=["GET"])
def getClassesCount():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401
    
    if isAdmin(current_user):
        count = Class_.query.count()
    elif isTeacher(current_user):
        user = User.query.filter_by(id=current_user).first()
        teacher = Teacher.query.filter_by(user_id = user.id).first()
        teacher_cs_records = Teacher_CS.query.filter_by(teacher_id = teacher.teacher_id).all()
        csids = [record.csid for record in teacher_cs_records]
        class_ids_records = Class_Subject.query.filter(Class_Subject.id.in_(csids)).all()
        class_ids = [record.class_id for record in class_ids_records]
        class_ids = set(class_ids)

        count = len(class_ids)

    return jsonify(count)

@classController.route("/getClassStudents", methods=["GET"])
def getClassStudents():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401    

    class_id = request.args.get("class_id")

    students = Student.query.filter_by(class_id = class_id).all()

    students_info = [{
        "id": student.id,
        "name": student.name,
        "surname": student.surname
    } for student in students] 

    return jsonify(students_info)

@classController.route("/createClass", methods=["POST"])
def createClass():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    label = request.json["label"]
    grade = request.json["grade"]
    type_id = request.json["type_id"]
    head_teacher = request.json["head_teacher"]

    newClass = Class_(label = label, grade = grade, type_id = type_id, head_teacher = head_teacher)

    db.session.add(newClass)
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200

@classController.route('/deleteClass/<class_id>', methods=['DELETE'])
def deleteClass(class_id):
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    class_ = Class_.query.get(class_id)

    if class_:
        db.session.delete(class_)
        db.session.commit()
        return jsonify({"message": "ok"}), 200
    else:
        return jsonify({"message": "Class not found"}), 404
    
@classController.route('/editClass/<class_id>', methods=['POST'])
def editClass(class_id):
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    label = request.json['label']
    grade = request.json['grade']
    type_id = request.json['type_id']

    class_ = Class.query.get(class_id)

    if class_:
        class_.label = label
        class_.grade = grade
        class_.type_id = type_id
        db.session.commit()
        return jsonify({"message": "ok"}), 200
    else:
        return jsonify({"message": "Class not found"}), 404