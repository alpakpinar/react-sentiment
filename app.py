from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS
from api.apiHandler import ApiHandler

app = Flask(__name__, static_folder='frontend/build')

# CORS(app)
api = Api(app)
api.add_resource(ApiHandler, "/api/sentiment", resource_class_kwargs={"sentence" : "This is good!"})

@app.route('/', defaults={'path' : ''})
def serve(path):
    return send_from_directory(app.static_folder)