from dotenv import load_dotenv
import os
import redis

load_dotenv()

class Config:
    SECRET_KEY = "u0#d;Dr0G)8XTtF~rNwp4[][fRP;b&deEY;PsbE3M4m{;_tijy"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://codebyat_sumariosUser:sumarios12345@185.12.116.140:3306/codebyat_sumarios"

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
    
    
class Development(Config):
    SQLALCHEMY_ECHO = True
    
class Production(Config):
    SQLALCHEMY_ECHO = False

app_config = Development