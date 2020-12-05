import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

app = Flask(__name__)
engine = create_engine("sqlite:///happiness.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Happiness = Base.classes.happiness

@app.route("/")
def index():
    return render_template('index1.html')
# def welcome():
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/happiness<br/>"
#         f"/api/happiness1<br/>"
#         f"/api/countries<br/>"
#     )

@app.route("/api/happiness")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    return jsonify(pd.read_sql_table("happiness", engine).to_json(orient="records"))


@app.route("/api/happiness1")
def cities():
    return pd.read_sql_table("happiness", engine).to_json(orient="records")

@app.route("/api/countries")
def countries():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Happiness.ISO3, Happiness.Country, Happiness.Region).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_countries
    all_countries = []
    for ISO3, Country, Region in results:
        countries_dict = {}
        countries_dict["ISO3"] = ISO3
        countries_dict["Country"] = Country
        countries_dict["Region"] = Region
        all_countries.append(countries_dict)

    return jsonify(all_countries)

@app.route("/api/countries1")
def countries1():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Happiness).all()

    session.close()

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)