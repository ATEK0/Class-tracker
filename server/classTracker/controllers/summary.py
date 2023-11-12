from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Summary import Summary

summary = Blueprint('summary', __name__)

@summary.route("/createSummary", methods=["POST"])
def createSummary():
    title = request.json["title"]
    content = request.json["content"]

    newSummary = Summary(title = title, content = content)

    db.session.add(newSummary)
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200