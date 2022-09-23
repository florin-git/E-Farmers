import os

from flask import Flask
from flask_restful import Api
from flask_cors import CORS
    
def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, origins=["http://localhost:3000"]) # This will enable CORS for the frontend
 
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'subscription_data.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Register the subscription_api blueprint and define api endpoints
    from . import api
    app.register_blueprint(api.bp)
    subscription_api_instance = Api(app)
    subscription_api_instance.add_resource(api.Queue, '/customer/', '/customer/<string:user_id>/')
    subscription_api_instance.add_resource(api.Exchange, '/farmer/', '/farmer/<string:farmer_id>/')

    

    # Initialize db
    from . import db
    db.init_app(app)

    return app