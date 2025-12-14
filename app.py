from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

# 1. Load environment variables
load_dotenv()

app = Flask(__name__)

# CONFIGURATION
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# --- DATA MODELS ---
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

# --- RECIPE MAPPING (The Efficiency Engine) ---
# Maps "User Typed Search" -> "Actual Filename"
# This is O(1) lookup time (Instant)
RECIPE_MAP = {
    "fish fry": "Fish_Fry.html",
    "chicken tandoori": "Chicken_Tandoori.html",
    "chicken lollipop": "Chicken_Lollipop.html",
    "mandi": "Mandi.html",
    "sri lankan crab curry": "Sri_Lankan_Crab_Curry.html",
    "rajma": "Rajma.html",
    "pav bhaji": "Pav_Bhaji.html",
    "rasgulla": "Rasgulla.html",
    "rasmalai": "Rasmalai.html",
    "masoor dal": "Masoor_Dal.html",
    "squid curry": "Squid_Curry.html",
    "mysore pak": "Mysore_Pak.html",
    "samosa": "Samosa.html",
    "gobi manchurian": "Gobi_Manchurian.html",
    "thai coconut shrimp": "Air_Fryer_Thai_Coconut_Shrimp.html",
    "aloo gobi": "Aloo_Gobi.html",
    "butter chicken": "Butter_Chicken.html",
    "air fryer calamari with chipotle dipping sauce": "Air_Fryer_Calamari_With_Chipotle_Dipping_Sauce.html",
    "butter garlic snails": "Butter_Garlic_Snails.html",
    "baingan bharta": "Baingan_Bharta.html",
    "barfi": "Barfi.html",
    "chana masala": "Chana_Masala.html",
    "oysters": "Char-Grilled_Honey_Parmesan_Oysters.html",
    "aloo methi": "Aloo_Methi.html",
    "chicken 65": "Chicken_65.html",
    "chicken curry": "Chicken_Curry.html",
    "chicken alfaham": "Chicken_Al-Faham.html",
    "jalebi": "Jalebi.html",
    "gajar ka halwa": "Gajar_Ka_Halwa.html",
    "dragon chicken": "Dragon_Chicken.html",
    "crab salad": "Crab_Salad.html",
    "veg manchow soup": "Veg_Manchow_Soup.html",
    "paneer butter masala": "Paneer_Butter_Masala.html",
    "shawarma": "Shawarma.html",
    "vegetable biriyani": "Vegetable_Biriyani.html",
    "recheado masala fish": "Recheado_Masala_Fish.html",
    "rogan josh": "Rogan_Josh.html",
    "shahi tukda": "Shahi_Tukda.html",
    "mutton nihari": "Mutton_Nihari.html",
    "mutton curry": "Mutton_Curry.html",
    "prawn curry": "South_Indian_Prawn_Curry.html",
    "prawn puri": "Prawn_Puri.html",
    "spring rolls": "Spring_Rolls.html",
    "mutton marag": "Mutton_marag.html",
    "sheer khurma": "Sheer_Khurma.html",
    "chilli chicken": "Chilli_Chicken.html",
    "idli sambar": "Idli_Sambar.html",
    "schezwan fried rice": "Schezwan_Fried_Rice.html",
    "paneer chilli": "Paneer_Chilli.html",
    "dal tadka": "Dal_Tadka.html",
    "palak paneer": "Palak_Paneer.html",
    "hakka noodles": "Hakka_Noodles.html",
    "chicken red masala": "Chicken_Red_Masala.html",
    "malai kofta": "Malai_Kofta.html",
    "ladoo": "Ladoo.html",
    "kerala style fish": "Kerala_Style_Fish_Fry.html",
    "mutton biriyani": "Mutton_Biriyani.html",
    "momos": "Momos.html",
    "dhokla": "Dhokla.html",
    "kheer": "Kheer.html",
    "pad thai yield": "Pad_Thai_Yield.html",
    "gulab jamun": "Gulab_Jamun.html",
    "honey chilli potatoes": "Honey_Chilli_Potatoes.html",
    "grilled octopus": "Grilled_Octopus.html",
    "chicken biriyani": "Chicken_Biriyani.html",
}

# --- ROUTES ---

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/index.html')
def dashboard():
    if 'user_id' in session:
        # We pass the firstname to the template so you can say "Hello, John!"
        return render_template('index.html', user_name=session.get('firstname')) 
    return redirect(url_for('home'))

# --- API ROUTES ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
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
    email_input = data.get('username')
    password_input = data.get('password')
    
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
    session.pop('firstname', None)
    return redirect(url_for('home'))

# --- SEARCH ROUTE (New) ---
# Handles the form submission from index.html
@app.route('/search')
def search():
    # Get the search term, lowercase it, and remove extra spaces
    query = request.args.get('pageName', '').lower().strip()
    
    # 1. Check if the exact search exists in our map
    if query in RECIPE_MAP:
        target_file = RECIPE_MAP[query]
        return render_template(target_file)
    
    # 2. Fallback: If no match, reload dashboard (or show a custom error page)
    # You could also return a message: return "Recipe not found", 404
    # return redirect(url_for('dashboard'))
    # return "Recipe not found", 404
    return render_template('no_recipes.html')

# --- DYNAMIC CATCH-ALL ROUTE (Must be Last) ---
# This handles direct clicks on links like <a href="Fish_Fry.html">
@app.route('/<path:page_name>')
def render_page(page_name):
    # Security: Prevent people from trying to access system files (e.g. ../../app.py)
    if '..' in page_name or page_name.startswith('.'):
        return "Invalid path", 400

    try:
        if not page_name.endswith(".html"):
             page_name = f"{page_name}.html"
        return render_template(page_name)
    except Exception:
        # return "Page not found", 404
        return render_template('no_recipes.html'), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)