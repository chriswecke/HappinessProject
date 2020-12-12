import numpy as np
import os
from os import environ, path
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.ext.declarative import declarative_base

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
Base = declarative_base()


# Creates Classes which will serve as the anchor points for our Tables
class Country(Base):
    __tablename__ = 'happiness'
    
    INDEX = Column(String(255), primary_key=True)
    ISO3 = Column(String(255))
    Region = Column(String(255))
    Country = Column(String(255))
    Score = Column(Float)
    GDP = Column(Float)
    Social_Support = Column(Float)
    Life_Exp = Column(Float)
    Freedom_Choice = Column(Float)
    Generosity = Column(Float)
    Corruption = Column(Float)
    Year = Column(Integer)




##engine = create_engine("sqlite:///titanic.sqlite")
engine = create_engine("sqlite:///happiness.sqlite")
conn = engine.connect()

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
#Base.prepare(engine, reflect=True)
Base.metadata.create_all(engine)

# Save reference to the table
##Passenger = Base.classes.passenger
Happiness_tbl = Base.classes.happiness

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/names<br/>"
        f"/api/v1.0/passengers"
    )


@app.route("/api/v1.0/names")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(Country).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)


# if __name__ == '__main__':
#     app.run(debug=True)
