from flask import Blueprint, request, jsonify, session

from .. import db

from ..models.Subject import Subject
from ..models.Class_Subject import Class_Subject
from ..models.Teacher_CS import Teacher_CS
from ..models.User import User, isAdmin
from ..models.Teacher import Teacher, isTeacher

subjectController = Blueprint("subjectController", __name__)


@subjectController.route("/getSubjectCount", methods=["GET"])
def getSubjectCount():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    if isAdmin(current_user):
        subjectCount = Subject.query.filter_by(is_deleted=0).count()
    elif isTeacher(current_user):
        user = User.query.filter_by(id=current_user).first()
        teacher = Teacher.query.filter_by(user_id=user.id).first()
        teacher_cs_records = Teacher_CS.query.filter_by(
            teacher_id=teacher.teacher_id, is_deleted=0
        ).all()
        csids = [record.csid for record in teacher_cs_records]
        subject_ids_records = Class_Subject.query.filter(
            Class_Subject.id.in_(csids)
        ).all()
        subject_ids = [record.subject_id for record in subject_ids_records]
        subject_ids = set(subject_ids)

        subjectCount = len(subject_ids)

    return jsonify(subjectCount)


@subjectController.route("/getSubject", methods=["GET"])
def getSubject():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    subjects = Subject.query.filter_by(is_deleted=0).all()

    subjects_info = [
        {
            "id": subject.id,
            "label": subject.label,
        }
        for subject in subjects
    ]

    return jsonify(subjects_info)


@subjectController.route("/getArchivedSubject", methods=["GET"])
def getArchivedSubject():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    subjects = Subject.query.filter_by(is_deleted=1).all()

    subjects_info = [
        {
            "id": subject.id,
            "label": subject.label,
        }
        for subject in subjects
    ]

    return jsonify(subjects_info)


@subjectController.route("/getSubjectTeachers", methods=["POST"])
def getSubjectTeachers():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    class_id = request.json["class_ID"]
    subject_id = request.json["subject"]

    class_subject = Class_Subject.query.filter_by(
        class_id=class_id, subject_id=subject_id
    ).first()

    tcs = Teacher_CS.query.filter_by(csid=class_subject.id).all()

    teacher_ids = [record.teacher_id for record in tcs]

    teacher = Teacher.query.filter(Teacher.teacher_id.in_(teacher_ids)).all()

    teacher_info = [
        {
            "id": teacher.id,
            "name": teacher.name,
            "surname": teacher.surname,
        }
        for teacher in teacher
    ]

    return jsonify(teacher_info)


@subjectController.route("/assignSubject", methods=["POST"])
def assignSubject():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    classID = request.json["classID"]
    subjectID = request.json["subjectID"]

    class_subject_exists = Class_Subject.query.filter_by(
        class_id=classID, subject_id=subjectID
    ).first()

    if class_subject_exists is not None and class_subject_exists.is_deleted:
        class_subject_exists.is_deleted = 0
        db.session.commit()
        return "Subject successfully assigned", 200

    if class_subject_exists is not None and not class_subject_exists.is_deleted:
        return "Subject already assigned to this Class", 400

    newClassSubject = Class_Subject(
        class_id=classID, subject_id=subjectID, is_deleted=0
    )

    db.session.add(newClassSubject)
    db.session.commit()

    return "Subject successfully assigned", 200


@subjectController.route("/createSubject", methods=["POST"])
def createSubject():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    label = request.json["label"]

    newSubject = Subject(label=label, is_deleted=0)

    db.session.add(newSubject)
    db.session.commit()

    return "Subject successfully created", 200


@subjectController.route("/toggleSubject/<subject_id>", methods=["POST"])
def toggleSubject(subject_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    subject = Subject.query.get(subject_id)
    classes_subjects = Class_Subject.query.filter_by(subject_id=subject.id).all()
    cs_ids = [record.id for record in classes_subjects]
    tcs = Teacher_CS.query.filter(Teacher_CS.csid.in_(cs_ids)).all()

    if not subject:
        return "Subject not found", 404

    if subject.is_deleted == 0:
        subject.is_deleted = 1
    else:
        subject.is_deleted = 0

    if classes_subjects and subject.is_deleted == 1:
        for class_subject in classes_subjects:
            class_subject.is_deleted = 1

    if tcs and subject.is_deleted == 1:
        for teacher_cs in tcs:
            teacher_cs.is_deleted = 1

    db.session.commit()
    return " successfully archived", 200


@subjectController.route("/editSubject/<subject_id>", methods=["POST"])
def editSubject(subject_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    label = request.json["label"]

    subject = Subject.query.get(subject_id)

    if subject:
        subject.label = label
        db.session.commit()
        return "Subject successfully edited", 200
    else:
        return "Subject not found", 404
