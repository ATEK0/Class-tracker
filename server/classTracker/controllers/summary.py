from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Summary import Summary

summary = Blueprint('summary', __name__)

@summary.route("/new_summary", methods=["GET"])
def createSummary():
    content = request.json["content"]