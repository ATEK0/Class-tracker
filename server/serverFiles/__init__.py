from flask import Flask, render_template
from flask_login import current_user
from flask_sqlalchemy import SQLAlchemy
from os import path

from flask_login import LoginManager


db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = 'EIgKcwiAndmX3qL6sMDCVQABJOY12rGeQXsY9Ri9S9h41ivryU'
    

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost/cloudTools' # para usar com MySQL Online
    
    db.init_app(app)
    migrate.init_app(app, db)

    
    # from .controllers.home import home
    # app.register_blueprint(home, url_prefix="/")

    
    @app.errorhandler(404)
    def not_found_error(error):
        return render_template("/errors/404.html"), 404
    
    @app.errorhandler(500)
    def internal_server_error(error):
        return render_template("/errors/500.html"), 500
    
    
    # from .models.User import User

    # Create the database tables
    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = "auth.login"
    login_manager.init_app(app)
    
    
    
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
    
    
    return app
