from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

import pgeocode
geocode_spain = pgeocode.Nominatim('es')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sherpa.db'
db = SQLAlchemy(app)
from models import User, Localizacion

from utils import check_if_user_exists, add_user


@app.route('/queryall')
def index():
    a = Localizacion.query.all()
    b = User.query.all()
    print(a)
    print(b)
    return "hello"

@app.route('/findcity')
def getUserCity():

    username = request.args.get("username")
    if username == None:
        return { "error": "Please provide a username"}, 400
    
    cp = request.args.get("cp")
    if cp == None:
        return { "error": "Please provide a cp"}, 400

    city = str(geocode_spain.query_postal_code(cp).place_name)
    if city == 'nan':
        return { "error": "Couldn't find a city with that CP"}, 400

    user_exists = check_if_user_exists(username)

    if not user_exists:
        add_user(username, cp, city)
        
    return { "user": username , "cp": cp, "city": city }, 200
    
    # Todo: @albertocaro Aqui hay un problema ahora, cuando un usuario que ya existe y
    # mete un cp diferente. Hay que ver como gestionarlo: hacemos un update a 
    # base de datos y mostramos lo que pide?
        