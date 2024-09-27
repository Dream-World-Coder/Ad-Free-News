from flask import render_template
from flask_login import login_required
from app.routes import app, db

# from app.forms import NewsForm


@app.route("/")
@app.route("/home")
def index():
    # form = NewsForm()
    return render_template("index.html")


@login_required
@app.route("/profile")
def profile():
    return render_template("profile.html")


@app.route("/<path:any_path>")
@app.route("/home/<path:any_path>")
def anything(any_path):
    return render_template("errors/404.html")


@app.route("/db_create_all_123_lorem")
def create_tables():
    db.create_all()
    return "Tables created successfully!"
