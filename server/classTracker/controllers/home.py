from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect
from flask_login import login_required, current_user, logout_user

from unidecode import unidecode

from werkzeug.utils import secure_filename

from ..controllers.auth import auth

from .. import db

from ..models.User import User

home = Blueprint('home', __name__)

@home.route('/', methods=["GET"])
def indexRedir():
    return redirect("/home")


@home.route('/home', methods=["GET"])
def index():
    if not current_user.is_authenticated:
        return redirect(url_for("auth.login"))
    else:
        return render_template("dashboard/index.html")


