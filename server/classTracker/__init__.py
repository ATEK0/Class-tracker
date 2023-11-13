from flask import Flask, render_template
from flask_login import current_user
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from os import path

from config import app_config

from flask_login import LoginManager

apiCalling = CORS()
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
server_session = Session()

def create_app():
    app = Flask(__name__)
    
    app.config.from_object(app_config)

    

    server_session.init_app(app)
    bcrypt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    apiCalling.init_app(app, supports_credentials=True)

    from .controllers.auth import auth
    app.register_blueprint(auth) 

    from .controllers.summary import summary
    app.register_blueprint(summary)
    
    from .controllers.class_ import class_subjects
    app.register_blueprint(class_subjects)

    from .controllers.subject import subjectController
    app.register_blueprint(subjectController)

    from .controllers.teacher import teacherController
    app.register_blueprint(teacherController)

    from .controllers.students import studentsController
    app.register_blueprint(studentsController)
    
    from .controllers.classroom import classroomController
    app.register_blueprint(classroomController)
    
    from .controllers.CalendarController import calendarController
    app.register_blueprint(calendarController)
    
    from .models.User import User
    from .models.Class_Subject import Class_Subject
    from .models.Class_Type import Class_Type
    from .models.Class_ import Class_
    from .models.Subject import Subject
    from .models.Summary import Summary
    from .models.User_Type import User_Type
    from .models.Teacher_CS import Teacher_CS
    from .models.Classroom import Classroom

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
