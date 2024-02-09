from flask import Blueprint, request, jsonify, send_file, session

from .. import db, bcrypt

from ..models.Class_Type import Class_Type
from ..models.User import isAdmin


classTypeController = Blueprint("classTypeController", __name__)


@classTypeController.route("/getClassTypes", methods=["GET"])
def getClassTypes():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401
    
    if not isAdmin(current_user):
        return "Unauthorized", 401

    types = Class_Type.query.all()

    classTypes_info = []
    for type in types:
        classTypes_info.append(
            {
                "id": type.id,
                "label": type.label,
            }
        )

    return jsonify(classTypes_info)
