from flask import Blueprint, request, jsonify, send_file, session

from .. import db, bcrypt

from ..models.User import User, isAdmin
from  ..models.Teacher import Teacher, isTeacher
from  ..models.Student import Student, isStudent
from  ..models.Class_ import Class_
from  ..models.Parent import Parent
from  ..models.Teacher_CS import Teacher_CS
from  ..models.Class_Subject import Class_Subject

studentController = Blueprint('studentController', __name__)


@studentController.route('/getStudentsCount', methods=["GET"])
def getStudentsCount():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if isAdmin(current_user):
        count = Student.query.count()
    elif isTeacher(current_user):
        user = User.query.filter_by(id=current_user).first()
        teacher = Teacher.query.filter_by(user_id = user.id).first()
        teacher_cs_records = Teacher_CS.query.filter_by(teacher_id = teacher.teacher_id).all()
        csids = [record.csid for record in teacher_cs_records]
        class_ids_records = Class_Subject.query.filter(Class_Subject.id.in_(csids)).all()
        class_ids = [record.class_id for record in class_ids_records]
        class_ids = set(class_ids)

        count = Student.query.filter(Student.class_id.in_(class_ids)).count()
        
    return jsonify(count)

@studentController.route("/getStudents", methods=["GET"])
def getStudents():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    students = Student.query.all()

    students_info = []
    for student in students:
        class_info = Class_.query.get(student.class_id)
        students_info.append({
            "id": student.id,
            "name": student.name + " " + student.surname,
            "email": student.email,
            "class_id": student.class_id,
            "class": str(class_info.grade) + "º " + class_info.label,
            "process": student.process_number
        })

    return jsonify(students_info)


@studentController.route("/getStudentInfo", methods=["POST"])
def getStudentInfo():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    user_id = request.json["id"]

    student = Student.query.filter_by(id = user_id).first()
    parent = Parent.query.get(student.parent_id)
    class_info = Class_.query.get(student.class_id)
    teacher = Teacher.query.filter_by(teacher_id = class_info.head_teacher).first()

    students_info = {
            "id": student.id,
            "name": student.name,
            "surname": student.surname,
            "email": student.email,
            "state": student.state,
            "type": "Student",
            "class_id": student.class_id,
            "address": student.address,
            "birthdate": student.birthdate,
            "class": str(class_info.grade) + class_info.label,
            "class_director": teacher.name + " " + teacher.surname,
            "process": student.process_number,
            "parentID": parent.id,
            "parentName": parent.name,
            "parentPhone": parent.phone,
            "parentEmail": parent.email,
            "parentAddress": parent.address
        }

    return jsonify(students_info)

@studentController.route("/createStudent", methods=["POST"])
def createStudent():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    name = request.json["firstName"]
    surname = request.json["lastName"]
    password = request.json["password"]
    email = request.json["email"]
    address = request.json["address"]
    birthdate = request.json["birthdate"]
    processNumber = request.json["pNumber"]
    parentName = request.json["parentName"]
    parentPhone = request.json["parentPhone"]
    parentEmail = request.json["parentEmail"]
    parentAddress = request.json["parentAddress"]
    class_id = request.json["class_ID"]

    user_exists = User.query.filter_by(email=email).first()

    if user_exists:
        return "Email already in use, please use another email", 409

    hashedPassword = bcrypt.generate_password_hash(password)

    newParent = Parent(name = parentName, phone = parentPhone, email = parentEmail, address = parentAddress)

    db.session.add(newParent)
    db.session.commit()

    newStudent = Student(name = name, surname = surname, email = email, password = hashedPassword, address = address, birthdate = birthdate, parent_id = newParent.id, process_number = processNumber, class_id = class_id)

    db.session.add(newStudent)
    db.session.commit()

    return "Student successfully created", 200

@studentController.route('/editStudent/<user_id>', methods=['POST'])
def editStudent(user_id):
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    name = request.json['firstName']
    surname = request.json['lastName']
    email = request.json['email']
    address = request.json['address']
    pNumber = request.json['pNumber']
    parentName = request.json["parentName"]
    parentPhone = request.json["parentPhone"]
    parentEmail = request.json["parentEmail"]
    parentAddress = request.json["parentAddress"]
    class_id = request.json['class_ID']

    user = Student.query.get(user_id)
    parent = Parent.query.get(user.parent_id)

    if user:
        user.name = name
        user.surname = surname
        user.email = email
        user.address = address
        user.state = 'Active'
        user.process_number = pNumber
        user.class_id = class_id
        parent.name = parentName
        parent.phone = parentPhone
        parent.email = parentEmail
        parent.address = parentAddress
        db.session.commit()
        return "Student successfully edited", 200
    else:
        return "User not found", 404

@studentController.route('/deleteStudent/<user_id>', methods=['DELETE'])
def deleteStudent(user_id):
    current_user = session.get("user_id")
    
    if not current_user:
        return "Unauthorized", 401

    user = User.query.filter_by(id = user_id).first()
    student = Student.query.filter_by(user_id = user_id).first()
    parent = Parent.query.filter_by(id = student.parent_id).first()
    count = Student.query.filter_by(parent_id = parent.id).count()
    print(count)

    if user:
        db.session.delete(user)
        db.session.delete(student)
        if count == 1:
            db.session.delete(parent)
        db.session.commit()
        return "Student successfully deleted", 200
    else:
        return "User not found", 404