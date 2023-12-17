from flask import Blueprint, request, jsonify, session

from .. import db

from ..models.Summary import Summary

summaryController = Blueprint('summaryController', __name__)


@summaryController.route("/createSummary", methods=["POST"])
def createSummary():
    current_user = session.get("user_id")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    title = request.json["title"]
    content = request.json["content"]

    newSummary = Summary(title = title, content = content)

    db.session.add(newSummary)
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200