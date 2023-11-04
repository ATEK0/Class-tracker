from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect
from flask_login import login_required, current_user, logout_user

from unidecode import unidecode

from werkzeug.utils import secure_filename

from ... import db

from ...models.Services import Services

servicos = Blueprint('servicos', __name__)

@servicos.route('/admin/servicos', methods=["GET"])
def index():
    
    servicos = Services.query.all()
    
    return render_template("admin/servicos/index.html", servicos = servicos )


