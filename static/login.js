// --- EXISTING UI LOGIC ---
function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if (i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

// --- PASSWORD TOGGLE FUNCTION ---
function setupPasswordToggle(toggleId, passwordId) {
    const toggleBtn = document.getElementById(toggleId);
    const passwordInput = document.getElementById(passwordId);

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            // Toggle type
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle icon
            toggleBtn.classList.toggle('bx-show');
            toggleBtn.classList.toggle('bx-hide');
        });
    }
}

// --- ENTER KEY HANDLER FUNCTION ---
function setupEnterKeySubmission(inputId, buttonId) {
    const inputElement = document.getElementById(inputId);
    const buttonElement = document.getElementById(buttonId);

    if (inputElement && buttonElement) {
        inputElement.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent default form submission if inside a form
                buttonElement.click(); // Trigger the button click
            }
        });
    }
}

// --- NEW BACKEND LOGIC ---

document.addEventListener("DOMContentLoaded", () => {

    // Setup toggles
    setupPasswordToggle('toggleLogin', 'loginPassword');
    setupPasswordToggle('toggleRegister', 'registerPassword');

    // Setup Enter Key Submission for Login
    setupEnterKeySubmission('loginUsername', 'signInSubmit');
    setupEnterKeySubmission('loginPassword', 'signInSubmit');

    // Setup Enter Key Submission for Registration
    setupEnterKeySubmission('registerFirstname', 'signUpSubmit');
    setupEnterKeySubmission('registerLastname', 'signUpSubmit');
    setupEnterKeySubmission('registerEmail', 'signUpSubmit');
    setupEnterKeySubmission('registerPassword', 'signUpSubmit');

    // Handle Registration
    const registerBtn = document.getElementById("signUpSubmit");
    if (registerBtn) {
        registerBtn.addEventListener("click", async (e) => {
            e.preventDefault(); // Stop default form behavior

            const firstnameInput = document.getElementById("registerFirstname");
            const lastnameInput = document.getElementById("registerLastname");
            const emailInput = document.getElementById("registerEmail");
            const passwordInput = document.getElementById("registerPassword");

            const firstname = firstnameInput.value;
            const lastname = lastnameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

            if (!firstname || !lastname || !email || !password) {
                alert("Please fill in all fields");
                return;
            }

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firstname, lastname, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Registration Successful! Please Sign In.");
                    login(); // Switch to login view using your existing function
                    // Clear form after success
                    firstnameInput.value = '';
                    lastnameInput.value = '';
                    emailInput.value = '';
                    passwordInput.value = '';
                } else {
                    alert(data.error);
                    // CHECK FOR SPECIFIC ERROR TO RESET FORM
                    if (data.error === 'Email already registered') {
                        firstnameInput.value = '';
                        lastnameInput.value = '';
                        emailInput.value = '';
                        passwordInput.value = '';
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred during registration.");
            }
        });
    }

    // Handle Login
    const loginBtn = document.getElementById("signInSubmit");
    if (loginBtn) {
        loginBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById("loginUsername");
            const passwordInput = document.getElementById("loginPassword");

            const username = usernameInput.value;
            const password = passwordInput.value;

            if (!username || !password) {
                alert("Please enter email and password");
                return;
            }

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Redirect to the dashboard/home page
                    window.location.href = data.redirect;
                } else {
                    alert(data.error);
                    // CHECK FOR SPECIFIC ERROR TO RESET FORM
                    if (data.error === 'Invalid email or password') {
                        usernameInput.value = '';
                        passwordInput.value = '';
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred during login.");
            }
        });
    }
});