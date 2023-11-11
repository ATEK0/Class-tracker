from flask import Blueprint, request, jsonify, redirect, session

from .. import db

from ..models.Summary import Summary

summary = Blueprint('summary', __name__)

@summary.route("/get_subject", methods=["get"])
def getSubject():
    ...