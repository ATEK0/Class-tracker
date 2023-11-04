from flask_login import login_user, login_required, logout_user, current_user
from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect

from ... import db

from ...models.User import User

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/dashboard', methods=["GET", "POST"])
def home():
    return render_template("dashboard/index.html")
