from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os

# OLD LINE:
# app = Flask(__name__, template_folder='.', static_folder='.')

# NEW CORRECT LINE:
app = Flask(__name__, 
            static_url_path='', 
            static_folder='.', 
            template_folder='.')

# CONFIGURATION
# Replace this string with your actual Neon Connection String
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://neondb_owner:npg_7KkMObRugGr4@ep-solitary-tooth-a4i0iaow-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key_here' # Change this for production

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# MODEL
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

# ROUTES

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/index.html')
def dashboard():
    if 'user_id' in session:
        return render_template('index.html') # Ensure you have this file
    return redirect(url_for('home'))

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    
    # Check if user exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    new_user = User(
        firstname=data['firstname'],
        lastname=data['lastname'],
        email=data['email'],
        password_hash=hashed_password
    )
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Registration successful! Please login.'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email_input = data['username'] # The HTML ID is loginUsername, but acts as email
    password_input = data['password']
    
    user = User.query.filter_by(email=email_input).first()
    
    if user and bcrypt.check_password_hash(user.password_hash, password_input):
        session['user_id'] = user.id
        session['firstname'] = user.firstname
        return jsonify({'message': 'Login successful', 'redirect': '/index.html'}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)