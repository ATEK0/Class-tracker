from flask import Blueprint, request, jsonify, session

from .. import db

from ..models.Summary import Summary

summaryController = Blueprint("summaryController", __name__)


@summaryController.route("/manageSummary", methods=["POST"])
def manageSummary():
    current_user = session.get("user_id")

    if not current_user:
        return "Unauthorized", 401

    content = request.json["content"]
    classroomID = request.json["classroomID"]

    summary_exists = Summary.query.filter_by(classroom_id=classroomID).first()

    if summary_exists is not None:
        summary_exists.content = content
    else:
        newSummary = Summary(content=content, classroom_id=classroomID)
        db.session.add(newSummary)

    db.session.commit()

    return "Summary successfully created/updated", 200
