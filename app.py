from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

import pgeocode
geocode_spain = pgeocode.Nominatim('es')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sherpa.db'
db = SQLAlchemy(app)
from models import User, Localizacion

from utils import check_if_user_exists, add_user_city, modify_user_city


@app.route('/findcity')
def getUserCity():
    
    username = request.args.get("username")
    if username == None:
        return { 
            "error":  1,
            "description":  "Please provide a username",
            "data":  {}
            }, 400
    
    cp = request.args.get("cp")
    if cp == None:
        return { 
            "error": 2,
            "description" : "Please provide a cp",
            "data" : {}
            }, 400

    city = str(geocode_spain.query_postal_code(cp).place_name)
    if city == 'nan':
        return { 
            "error": 3,
            "description" : "Couldn't find a city with that CP",
            "data" : {}
            }, 400

    user_exists = check_if_user_exists(username)

    if not user_exists:
        add_user_city(username, cp, city)
    else:
        modify_user_city(username, cp, city)
        
    return { 
            "error": 0,
            "description" : "",
            "data" : { "user": username , "cp": cp, "city": city }
            }, 200
    

        