from flask import Blueprint, request, jsonify, session

from .. import db

from ..models.Class_Subject import Class_Subject
from ..models.Subject import Subject
from ..models.Class_ import Class_
from ..models.User import User, isAdmin
from ..models.Student import Student
from ..models.Teacher import Teacher, isTeacher
from ..models.Teacher_CS import Teacher_CS
from ..models.Class_Type import Class_Type

classController = Blueprint("classController", __name__)


@classController.route("/getClassSubjects/<class_ID>", methods=["GET"])
def getClassSubjects(class_ID):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    class_ = class_ID

    classSubjects = Class_Subject.query.filter_by(class_id=class_, is_deleted = 0).all()

    subject_info = []
    for class_subject in classSubjects:
        subject = Subject.query.get(class_subject.subject_id)
        subject_info.append({"id": subject.id, "name": subject.label})

    return jsonify(subject_info)

@classController.route("/getClassInfo/<classID>", methods=["GET"])
def getClassInfo(classID):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401
    
    classInfo = Class_.query.get(classID)


    classInfo = {
        "label": classInfo.label,
        "grade": classInfo.grade,
        "type_id": classInfo.type_id,
        "head_teacher": classInfo.head_teacher
    }
    return jsonify(classInfo)

@classController.route("/getClasses", methods=["GET"])
def getClasses():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    classes = Class_.query.filter_by(is_deleted=0).all()

    class_info = []
    for class_ in classes:
        teacher = Teacher.query.filter_by(teacher_id=class_.head_teacher).first()
        class_type = Class_Type.query.filter_by(id=class_.type_id).first()

        if not teacher:
            teacherName = "Not Defined"
        else:
            teacherName = teacher.name + " " + teacher.surname

        class_info.append(
            {
                "id": class_.id,
                "label": class_.label,
                "grade": class_.grade,
                "type": class_.type_id,
                "type_label": class_type.label,
                "headteacher": teacherName,
                "is_archived": 0,
            }
        )

    return jsonify(class_info)


@classController.route("/getArchivedClasses", methods=["GET"])
def getArchivedClasses():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    classes = Class_.query.filter_by(is_deleted=1).all()

    class_info = []
    for class_ in classes:
        teacher = Teacher.query.filter_by(teacher_id=class_.head_teacher).first()

        if not teacher:
            teacherName = "Not Defined"
        else:
            teacherName = teacher.name + " " + teacher.surname

        class_info.append(
            {
                "id": class_.id,
                "label": class_.label,
                "grade": class_.grade,
                "headteacher": teacherName,
                "is_archived": 1,
            }
        )

    return jsonify(class_info)


@classController.route("/getClassesCount", methods=["GET"])
def getClassesCount():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    if isAdmin(current_user):
        count = Class_.query.filter_by(is_deleted = 0).count()
    elif isTeacher(current_user):
        user = User.query.filter_by(id=current_user).first()
        teacher = Teacher.query.filter_by(user_id=user.id).first()
        teacher_cs_records = Teacher_CS.query.filter_by(
            teacher_id=teacher.teacher_id, is_deleted=0
        ).all()
        csids = [record.csid for record in teacher_cs_records]
        class_ids_records = Class_Subject.query.filter(
            Class_Subject.id.in_(csids)
        ).all()
        class_ids = [record.class_id for record in class_ids_records]
        class_ids = set(class_ids)

        count = len(class_ids)
    else:
        return "Unauthorized", 401

    return jsonify(count)


@classController.route("/getClassStudents", methods=["POST"])
def getClassStudents():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        if not isTeacher(current_user):
            return "Unauthorized", 401

    class_id = request.json.get("class_id")

    students = Student.query.filter_by(class_id=class_id).all()

    students_info = [
        {"id": student.id, "name": student.name, "surname": student.surname}
        for student in students
    ]

    return jsonify(students_info)


@classController.route("/createClass", methods=["POST"])
def createClass():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    label = request.json["label"]
    grade = request.json["grade"]
    type_id = request.json["type_id"]
    head_teacher = request.json["head_teacher"]

    newClass = Class_(
        label=label,
        grade=grade,
        type_id=type_id,
        head_teacher=head_teacher,
        is_deleted=0,
    )

    db.session.add(newClass)
    db.session.commit()

    return "Class successfully created", 200


@classController.route("/toggleClass/<class_id>", methods=["POST"])
def toggleClass(class_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    class_ = Class_.query.get(class_id)
    classes_subjects = Class_Subject.query.filter_by(class_id=class_.id).all()
    cs_ids = [record.id for record in classes_subjects]
    tcs = Teacher_CS.query.filter(Teacher_CS.csid.in_(cs_ids)).all()

    if not class_:
        return "Class not found", 404

    if class_.is_deleted == 0:
        class_.is_deleted = 1
    else:
        class_.is_deleted = 0

    if classes_subjects and class_.is_deleted == 1:
        for class_subject in classes_subjects:
            class_subject.is_deleted = 1

    if tcs and class_.is_deleted == 1:
        for teacher_cs in tcs:
            teacher_cs.is_deleted = 1

    db.session.commit()
    return " successfully archived", 200


@classController.route("/editClass/<class_id>", methods=["POST"])
def editClass(class_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    label = request.json["label"]
    grade = request.json["grade"]
    type_id = request.json["type_id"]
    head_teacher = request.json["head_teacher"]

    class_ = Class_.query.get(class_id)

    if class_:
        class_.label = label
        class_.grade = grade
        class_.type_id = type_id
        class_.head_teacher = head_teacher
        db.session.commit()
        return "Class successfully updated", 200
    else:
        return "Class not found", 404
