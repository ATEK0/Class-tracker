from flask import Blueprint, request, jsonify, redirect, session

from .. import db, bcrypt
from datetime import date

from ..models.User import User, isAdmin
from ..models.Teacher import Teacher, isTeacher
from ..models.Class_Subject import Class_Subject
from ..models.Teacher_CS import Teacher_CS
from ..models.Class_ import Class_
from ..models.Subject import Subject
from ..models.Classroom import Classroom

teacherController = Blueprint("teacher", __name__)


@teacherController.route("/getTeachersCount", methods=["GET"])
def getTeachersCount():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    count = Teacher.query.filter_by(is_deleted = 0).count()

    return jsonify(count)


@teacherController.route("/getTeacherClassroomsCount", methods=["GET"])
def getTeacherClassroomsCount():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isTeacher(current_user):
        return "Unauthorized", 401

    user = User.query.filter_by(id=current_user).first()
    teacher = Teacher.query.filter_by(user_id=user.id).first()
    teacher_cs_records = Teacher_CS.query.filter_by(
        teacher_id=teacher.teacher_id, is_deleted=0
    ).all()
    tcsids = [record.id for record in teacher_cs_records]
    count = (
        Classroom.query.filter_by(day=str(date.today()))
        .filter(Classroom.tcs_id.in_(tcsids))
        .count()
    )

    return jsonify(count)


@teacherController.route("/getTeachers", methods=["GET"])
def getTeachers():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    teachers = Teacher.query.all()

    teachers_info = [
        {
            "id": teacher.id,
            "name": teacher.name + " " + teacher.surname,
            "contact": teacher.contact,
            "email": teacher.email,
            "teacher_id": teacher.teacher_id,
            "state": teacher.state,
        }
        for teacher in teachers
    ]

    return jsonify(teachers_info)


@teacherController.route("/getTeacherInfo", methods=["POST"])
def getTeacherInfo():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    user_id = request.json["id"]

    teacher = Teacher.query.filter_by(user_id=user_id).first()
    teacher_cs_records = Teacher_CS.query.filter_by(teacher_id=teacher.teacher_id).all()
    csids = [record.csid for record in teacher_cs_records]

    class_ids_records = Class_Subject.query.filter(Class_Subject.id.in_(csids)).all()
    class_ids = [record.class_id for record in class_ids_records]
    class_ids = set(class_ids)

    classes = Class_.query.filter(Class_.id.in_(class_ids)).all()

    classes_list = [
        {"id": str(record.id), "label": str(record.grade) + "º " + record.label}
        for record in classes
    ]

    subject_ids_records = Class_Subject.query.filter(Class_Subject.id.in_(csids)).all()
    subject_ids = [record.subject_id for record in subject_ids_records]
    subject_ids = set(subject_ids)

    subjects = Subject.query.filter(Subject.id.in_(subject_ids)).all()

    subjects_list = [
        {"id": str(record.id), "label": record.label} for record in subjects
    ]

    teacher_info = {
        "id": teacher.id,
        "name": teacher.name,
        "surname": teacher.surname,
        "email": teacher.email,
        "state": teacher.state,
        "userType": "Teacher",
        "address": teacher.address,
        "birthdate": teacher.birthdate,
        "contact": teacher.contact,
        "subjects": subjects_list,
        "classes": classes_list,
    }

    return jsonify(teacher_info)


@teacherController.route("/assignTeacher", methods=["POST"])
def assignTeacher():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    classID = request.json["classID"]
    subjectID = request.json["subjectID"]
    teacherID = request.json["teacherID"]

    class_subject = Class_Subject.query.filter_by(
        class_id=classID, subject_id=subjectID
    ).first()
    teacher = Teacher.query.filter_by(teacher_id=teacherID).first()

    teacher_cs_exists = Teacher_CS.query.filter_by(
        teacher_id=teacher.teacher_id, csid=class_subject.id
    ).first()

    if teacher_cs_exists and teacher_cs_exists.is_deleted:
        teacher_cs_exists.is_deleted = 0
        db.session.commit()
        return "Teacher successfully assigned", 200

    if teacher_cs_exists and not teacher_cs_exists.is_deleted:
        return "Teacher already assigned to this Class and Subject", 400

    newTcs = Teacher_CS(
        teacher_id=teacher.teacher_id, csid=class_subject.id, is_deleted=0
    )

    db.session.add(newTcs)
    db.session.commit()

    return "Teacher successfully assigned", 200


@teacherController.route("/createTeacher", methods=["POST"])
def createTeacher():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    name = request.json["firstName"]
    surname = request.json["lastName"]
    password = request.json["password"]
    email = request.json["email"]
    address = request.json["address"]
    birthdate = request.json["birthdate"]
    contact = request.json["contact"]

    user_exists = User.query.filter_by(email=email).first()

    if user_exists:
        return "Email already in use, please use another email", 409

    hashedPassword = bcrypt.generate_password_hash(password)

    newTeacher = Teacher(
        name=name,
        surname=surname,
        email=email,
        password=hashedPassword,
        address=address,
        birthdate=birthdate,
        contact=contact,
        is_deleted=0,
    )

    db.session.add(newTeacher)
    db.session.commit()

    return "Teacher successfully created", 200


@teacherController.route("/editTeacher/<user_id>", methods=["POST"])
def editTeacher(user_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    name = request.json["firstName"]
    surname = request.json["lastName"]
    email = request.json["email"]
    address = request.json["address"]
    contact = request.json["contact"]
    state = request.json["teacherState"]

    user = Teacher.query.get(user_id)

    if user:
        user.name = name
        user.surname = surname
        user.email = email
        user.address = address
        user.state = state
        user.contact = contact
        db.session.commit()
        return "Teacher successfully edited", 200
    else:
        return "User not found", 404


@teacherController.route("/deleteTeacher/<user_id>", methods=["DELETE"])
def deleteTeacher(user_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    user = User.query.filter_by(id=user_id).first()
    teacher = Teacher.query.filter_by(user_id=user_id).first()

    if user:
        db.session.delete(user)
        db.session.delete(teacher)
        db.session.commit()
        return "Teacher successfully deleted", 200
    else:
        return "User not found", 404
