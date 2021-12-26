from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from api.apiHandler import ApiHandler

app = Flask(__name__)

# CORS(app)
api = Api(app)
api.add_resource(ApiHandler, "/api/sentiment", resource_class_kwargs={"sentence" : "This is good!"})