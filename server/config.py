import os
import redis


class Config:
    SECRET_KEY = "u0#d;Dr0G)8XTtF~rNwp4[][fRP;b&deEY;PsbE3M4m{;_tijy"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://codebyat_sumariosUser:sumarios12345@185.12.116.140:3306/codebyat_sumarios"

    SESSION_TYPE = "redis"
    SESSION_COOKIE_HTTPONLY = False
    SESSION_PERMANENT = False

    REDIS_HOST = os.environ.get('REDIS_HOST', '127.0.0.1')
    SESSION_REDIS = redis.from_url(f"redis://{REDIS_HOST}:6379")

    SQLALCHEMY_POOL_RECYCLE = 28000
    SQLALCHEMY_POOL_SIZE = 8
    SQLALCHEMY_POOL_PRE_PING = True
    
class Development(Config):
    SQLALCHEMY_ECHO = True
    
class Production(Config):
    SQLALCHEMY_ECHO = False


app_config = Development