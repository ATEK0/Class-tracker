from contextlib import contextmanager
from flask import Flask, render_template
from flask_login import current_user
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from os import path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

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

    @contextmanager
    def session_scope():
        db_engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'], pool_pre_ping=True)
        Session = sessionmaker(bind=db_engine)
        session = Session()
        try:
            # this is where the "work" happens!
            yield session
            # always commit changes!
            session.commit()
        except:
            # if any kind of exception occurs, rollback transaction
            session.rollback()
            raise
        finally:
            session.close()

    from .controllers.AuthController import authController
    app.register_blueprint(authController) 
    
    from .controllers.ClassController import classController
    app.register_blueprint(classController)

    from .controllers.SubjectController import subjectController
    app.register_blueprint(subjectController)

    from .controllers.TeacherController import teacherController
    app.register_blueprint(teacherController)

    from .controllers.StudentController import studentController
    app.register_blueprint(studentController)
    
    from .controllers.ClassroomController import classroomController
    app.register_blueprint(classroomController)
    
    from .controllers.CalendarController import calendarController
    app.register_blueprint(calendarController)
    
    from .controllers.ProfileController import profileController
    app.register_blueprint(profileController)
    
    from .controllers.UserController import userController
    app.register_blueprint(userController)
    
    from .controllers.ClassTypeController import classTypeController
    app.register_blueprint(classTypeController)
    
    from .models.User import User
    from .models.Class_Subject import Class_Subject
    from .models.Class_Type import Class_Type
    from .models.Class_ import Class_
    from .models.Subject import Subject
    from .models.Summary import Summary
    from .models.Teacher_CS import Teacher_CS
    from .models.Classroom import Classroom
    from .models.Parent import Parent
    from .models.Student import Student
    from .models.Teacher import Teacher
    from .models.Absence import Absence

    
    return app
