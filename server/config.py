from dotenv import load_dotenv
import os
import redis

load_dotenv()

class Config:
    SECRET_KEY = "u0#d;Dr0G)8XTtF~rNwp4[][fRP;b&deEY;PsbE3M4m{;_tijy"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://codebyat_sumariosUser:sumarios12345@185.12.116.140:3306/codebyat_sumarios"

    SESSION_TYPE = "redis"
    SESSION_COOKIE_HTTPONLY = False
    SESSION_PERMANENT = False
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")

    SQLALCHEMY_POOL_RECYCLE = 28000
    SQLALCHEMY_POOL_SIZE = 8
    SQLALCHEMY_POOL_PRE_PING = True
    
class Development(Config):
    SQLALCHEMY_ECHO = True
    
class Production(Config):
    SQLALCHEMY_ECHO = False

class Dockerization(Config):
    SESSION_REDIS = redis.from_url("redis://redis:6379")


app_config = Dockerization