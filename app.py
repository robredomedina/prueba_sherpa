from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

import pgeocode
geocode_spain = pgeocode.Nominatim('es')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sherpa.db'

db = SQLAlchemy(app)
from models import User, Localizacion

from utils import check_if_user_exists, add_user


@app.route('/')
def index():
    this_user = request.args['username']
    cp = request.args['cp']

    if this_user == undefined:
        print("no username")

    return "byr"

@app.route('/findcity')
def getUserCity():

    this_user = request.args['username']
    cp = request.args['cp']

    if this_user == undefined:
        print("no username")
    city = geocode_spain.query_postal_code(cp).place_name
    
    user_exists = check_if_user_exists(this_user)

    if not user_exists:
        add_user(this_user, cp, city)

    return { "user": this_user , "cp": cp, "city": city }