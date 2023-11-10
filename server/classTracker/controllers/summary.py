from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Summary import Summary

summary = Blueprint('summary', __name__)

@summary.route("/new_summary", methods=["POST"])
def createSummary():
    title = request.json["title"]
    content = request.json["content"]
    csid = request.json["csid"]
    begin = request.json["begin"]
    end = request.json["end"]
    state = request.json["state"]

    newSummary = Summary(title = title, content = content, csid = csid, begin = begin, end = end, state = state)

    db.session.add(newSummary)
    db.session.commit()

    return jsonify ({
        "message": "ok"
    }), 200