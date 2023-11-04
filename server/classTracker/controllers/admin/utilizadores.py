from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect
from flask_login import login_required, current_user, logout_user

from unidecode import unidecode

from werkzeug.utils import secure_filename

from werkzeug.security import generate_password_hash

from ... import db

from ...models.User import User


utilizadores = Blueprint('utilizadores', __name__)

@utilizadores.route('/admin/utilizadores', methods=["GET"])
def index():
    
    users = User.query.filter(User.id > 1).all()

    
    usersAtivo = User.query.filter_by(estado="Ativo").all()
    usersInativo = User.query.filter_by(estado="Inativo").all()
    
    users = [(user, user.criado[0:19], user.ultimoLogin[0:19]) for user in users]
    
    print(users)
    
    return render_template("admin/utilizadores/index.html", users = users, ativos = usersAtivo, inativos = usersInativo)


@utilizadores.route("/admin/addUser", methods=["POST"])
def addUser():
    
    if request.method == "POST":
        
        nome = request.form.get("nome")
        sobrenome = request.form.get("sobrenome")
        email = request.form.get("email")
        password = request.form.get('password1')
        
        print(nome, sobrenome, email, password)
        
        if User.query.filter_by(email = email).first():
            return jsonify("Email existe")
    
        else:
            
            newUser = User(name = nome , surname = sobrenome , email = email , password = generate_password_hash(password, method="sha256"))
            
            try:
                db.session.add(newUser)
                db.session.commit()
            
                return jsonify("ok"), 200
            
            except Exception as e:
                return e, 500
            
    


