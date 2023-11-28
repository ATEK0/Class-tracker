from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect, session
from flask_login import login_required, current_user, logout_user

from .. import db

from ..models.User import User, isAdmin
from  ..models.Teacher import Teacher, isTeacher

studentController = Blueprint('studentController', __name__)

@studentController.route('/getStudentsCount', methods=["GET"])
def getCount():
    user_id = session.get("user_id")
    
    if isAdmin(user_id):
        count = Teacher.query.count()
    elif isTeacher(user_id):
        ...
        
    return jsonify(count)


