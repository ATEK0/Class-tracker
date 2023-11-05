from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect
from flask_login import login_required, current_user, logout_user

from unidecode import unidecode

from werkzeug.utils import secure_filename

from .. import db

from ..models.User import User

home = Blueprint('home', __name__)

@home.route('/', methods=["GET"])
def baseURL():
    return "abc"


