# 🍳 Recipe Book Web Application

A full-stack Flask web application for browsing recipes, featuring a secure login/registration system with interactive UI animations, database integration, and a responsive design.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Prerequisites & Dependencies](#prerequisites--dependencies)
- [Installation & Setup](#installation--setup)
- [Configuration (.env)](#configuration-env)
- [Usage Guide](#usage-guide)
  - [Authentication](#authentication)
  - [Dashboard & Search](#dashboard--search)
  - [Recipe Navigation](#recipe-navigation)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🔭 Project Overview

This project replaces a static HTML website with a dynamic Flask (Python) backend. It connects to a Neon (PostgreSQL) database to store user credentials securely. The frontend maintains a high-quality aesthetic with a sliding Login/Register form, glassmorphism effects, and responsive navigation.

**Key Technical Components:**

- **Backend:** Flask (Python)
- **Database:** PostgreSQL (via Neon Tech)
- **ORM:** SQLAlchemy
- **Security:** Bcrypt (Password Hashing)
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)

## ✨ Features

### 🔐 Authentication System

- **Sliding UI:** Smooth CSS transitions between Login and Registration forms.
- **Secure Registration:** Captures First Name, Last Name, Email, and Password. Passwords are hashed before storage.
- **Login Logic:** Validates credentials against the database using secure hash comparison.
- **Session Management:** Uses Flask Sessions to keep users logged in across pages.
- **Logout:** Securely clears the session and redirects to the home page.
- **Password Toggle:** "Eye" icon to show/hide passwords.
- **Enter Key Support:** Submit forms by pressing "Enter" on any field.
- **Auto-Reset:** Forms automatically clear specific fields on errors (e.g., "Email already registered").

### 🍳 Recipe Dashboard

- **Dynamic Search:** A search bar that maps user queries (e.g., "Fish Fry") to specific HTML recipe files instantly using an O(1) Python dictionary lookup.
- **Smart Fallback:** If a recipe isn't found, users are shown a custom, animated "No Recipe Found" page (no_recipes.html) instead of a 404 error.
- **User Personalization:** The dashboard greets the user by their First Name upon login.

### 📱 Responsive Design

- **Mobile-First:** Navigation and forms adapt to mobile screens (hamburger menu, stacked layouts).
- **Glassmorphism:** Modern UI with translucent backgrounds and blur effects.

## 📂 Folder Structure

The project follows the standard Flask application structure.

```
/Recipe_Book_Project
│
├── app.py                  # MAIN ENTRY POINT: Flask server, routes, and DB models
├── .env                    # SENSITIVE DATA: Database URL and Secret Key (Excluded from git)
├── README.md               # Documentation
│
├── templates/              # HTML FILES (Flask renders these)
│   ├── login.html          # Entry page (Login/Register forms)
│   ├── index.html          # Dashboard (Search bar, Navigation)
│   ├── contact.html        # Contact page
│   ├── about.html          # About page
│   ├── no_recipes.html     # Custom 404/Not Found page
│   ├── Rasmalai.html       # Individual Recipe Page
│   └── ... (Other recipe HTML files)
│
└── static/                 # STATIC ASSETS (CSS, JS, Images)
    ├── login.css           # Styles for Login/Register page
    ├── login.js            # Logic for Login/Register animations & API calls
    ├── no_recipes.css      # Styles for the 404 page
    ├── no_recipes.js       # Logic for the 404 page (Go Back buttons)
    ├── style.css           # Style for the Dashboard
    ├── style.js            # Logic for the Dashboard
    ├── contact.css         # Style for the Contact page
    ├── about.css           # Style for the About page
    ├── favicon.ico         # Site Icon
    └── ... (Other recipe Style files)
    └── ... (Other recipe Logic files)
```

## 🛠 Prerequisites & Dependencies

Ensure you have Python 3.10+ installed.

### Required Python Packages

Install these using pip:

```bash
pip install flask flask-sqlalchemy flask-bcrypt psycopg2-binary python-dotenv
```

| Package | Purpose |
|---------|---------|
| Flask | The web framework. |
| flask-sqlalchemy | ORM to interact with the database using Python classes. |
| flask-bcrypt | For hashing and checking passwords securely. |
| psycopg2-binary | PostgreSQL adapter for Python. |
| python-dotenv | To load configuration from the .env file. |

## ⚙️ Configuration (.env)

**CRITICAL:** You must create a file named `.env` in the root folder. This file keeps your secrets safe.

**Content of .env:**

```env
# Your Neon Database Connection String
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-solitary-tooth.region.aws.neon.tech/neondb?sslmode=require

# A random string for securing sessions (generate a random one)
SECRET_KEY=super_secret_random_key_12345
```

## 🚀 Installation & Setup

1. Clone/Download the project folder.
    ```bash
    git clone https://github.com/Shaik-Fahad-11/Recipe_Book
    cd Recipe_Book
    ```
2. **Organize Files:** Ensure the folder structure matches the Folder Structure section above (HTML in `templates`, CSS/JS in `static`).
3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   # OR run the pip install command listed in Prerequisites
   ```
4. **Create .env:** Create the `.env` file with your credentials.
5. **Run the App:**
   ```bash
   python app.py
   ```
6. **Access:** Open your browser and go to `http://127.0.0.1:5000`.

**Note:** The first time you run the app, it will automatically create the `users` table in your database if it doesn't exist.

## 📖 Usage Guide

### Authentication

- **Sign Up:** Click "Sign Up" on the landing page. Fill in your details.
  - **Constraint:** Email must be unique.
- **Sign In:** Use your email and password.
  - **Success:** Redirects to Dashboard (index.html).
  - **Failure:** Shows an alert. Invalid password clears password field; invalid email resets both.

### Dashboard & Search

- **Search:** Type a recipe name (e.g., "Butter Chicken") in the search bar.
  - **Results:**
    - **Found:** Instantly loads the recipe page.
    - **Not Found:** Redirects to the colorful `no_recipes.html` page with options to go back.

### Recipe Navigation

- Clicking "Home" or "Recipes" in the nav bar keeps you within the authenticated session.
- Clicking **Logout** destroys your session and returns you to the Login screen.

## 📡 API Endpoints

The frontend (login.js) communicates with these backend routes in app.py:

| Method | Endpoint | Description | Payload |
|--------|----------|-------------|---------|
| GET | `/` | Renders Login Page | - |
| POST | `/api/register` | Registers a new user | `{firstname, lastname, email, password}` |
| POST | `/api/login` | Authenticates user | `{username, password}` |
| GET | `/logout` | Clears session | - |
| GET | `/search` | Searches for recipe | `?pageName=query` |
| GET | `/<page_name>` | Renders dynamic HTML | - |

## 🔧 Troubleshooting

### 1. TemplateNotFound Error

- **Cause:** Flask cannot find your HTML file.
- **Fix:** Ensure all HTML files are inside the `templates/` folder.

### 2. CSS/JS Not Loading (404)

- **Cause:** Flask cannot find your static assets.
- **Fix:** Ensure all CSS/JS files are inside the `static/` folder. Use `{{ url_for('static', filename='login.css') }}` in your HTML.

### 3. Database Connection Error

- **Cause:** Incorrect credentials in `.env` or network issues.
- **Fix:** Check your Neon console for the correct connection string. Ensure `psycopg2-binary` is installed.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

Distributed under the MIT License. See `MIT LICENSE` for more information.
