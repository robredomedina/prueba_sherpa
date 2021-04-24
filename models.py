from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)

    def __repr__(self):
        return("User: {}".format(self.username))

class Localizacion(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user = db.Column(db.String(20), db.ForeignKey('user.username'), nullable=False)
    cp = db.Column(db.String(5), unique=False, nullable=False)
    city = db.Column(db.String(20), unique=False, nullable=False)

    def __repr__(self):
        return("User: {} - {} {}".format(self.user, self.cp, self.city))
