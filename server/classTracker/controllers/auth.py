from flask_login import login_user, login_required, logout_user, current_user
from flask import Blueprint, render_template, request, flash, jsonify, url_for, send_file, redirect

from werkzeug.security import generate_password_hash, check_password_hash

from .. import db

from ..models.User import User

from datetime import datetime


auth = Blueprint('auth', __name__)

@auth.route('/register', methods=["GET", "POST"])
def register():
       
    if current_user.is_authenticated:
        return redirect(url_for("dashboard.dashboardHome"))
    else:
        if request.method == 'POST':
                                            
            name = request.form.get("name")
            surname = request.form.get("surname")
            email = request.form.get("email")
            password = request.form.get("password")
            password2 = request.form.get("password2")
            
            user = User.query.filter_by(email = email).first()
            
            if user:
                return jsonify("user exists")
            else:
            
                print(name, surname, email,password, password2)
                
                if password == password2:
                    new_user = User(email=email, name = name, surname = surname, password=generate_password_hash(password, method="sha256"))
                    
                    db.session.add(new_user)
                    db.session.commit()
                    
                    print("veio ate aq")
                    
                    return jsonify("OK")
                else:
                    return 'As passwords não batem certo, volte a tentar'
    
    return render_template('auth/register/index.html')

@auth.route('/login', methods=["GET", "POST"])
def login():
    
    if current_user.is_authenticated:
        return redirect(url_for("dashboard.home"))
    else:
        if request.method == 'POST':
            email = request.form.get("email")
            password = request.form.get("password")
            try:
                remember = request.form.get("remember")
                
                if remember:
                    rememberME = True
                else: 
                    rememberME = False
            except Exception as e:
                rememberME = False
                        
            user = User.query.filter_by(email = email).first()
            print(user)
            if user:
                if user.name != "Admin":
                    user(ultimoLogin = datetime.now())
                    
                    db.session.commit()
                
                if check_password_hash(user.password, password):
                    login_user(user, remember=rememberME)
                    return jsonify("OK")
                else: 
                    return jsonify("NotValid")
            else: 
                return jsonify("NotValid")
                
                
        
    return render_template('auth/login/index.html')

@auth.route('/logout')
@login_required
def logout():  
    logout_user()
    return redirect(url_for("auth.login"))
