from models import User, Localizacion
from app import db

# Todo: @albertocaro, estas funciones deberían ser parte de los modelos?

def check_if_user_exists(user):
    
    query = User.query.filter_by(username=user).all()
    if len(query) == 0:
        return False
    else:
        return True

def add_user(user, cp, city):
    print("Nuevo usuario...")
    new_user = User(username=user)
    db.session.add(new_user)
    db.session.commit()
        
    user = User.query.filter_by(username=user).first()
    loc = Localizacion(user=user.id, cp=cp, city=city)
    db.session.add(loc)
    db.session.commit()
    print("...usuario añadido a la BD")