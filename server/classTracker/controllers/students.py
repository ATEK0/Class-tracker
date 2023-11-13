from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect
from flask_login import login_required, current_user, logout_user

from .. import db

from ..models.User import User

studentsController = Blueprint('studentsController', __name__)

@studentsController.route('/getStudentsCount', methods=["GET"])
def getCount():
    userType = request.args.get("type")
    
    if userType == "Admin":
        count = User.query.filter_by(type = 2).count()
    elif userType == "Teacher":
        ...
        
    return jsonify(count)


