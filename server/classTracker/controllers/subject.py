from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Subject import Subject

subjectController = Blueprint('subjectController', __name__)

@subjectController.route("/get_subject", methods=["get"])
def getSubject():
    subjects = Subject.query.all()

    subjects_info = [{
            "id": subject.id,
            "label": subject.label,
        } for subject in subjects] 


    return jsonify(subjects_info)
