// Function to handle the "Go Back" button
function goBack() {
    // Uses the browser's history to go to the previous page
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Fallback if no history exists
        window.location.href = '/index.html';
    }
}

// Function to handle the "Explore Recipes" button
function goHome() {
    // Redirects explicitly to the dashboard/home route
    window.location.href = '/index.html';
}

// Add a playful console message
console.log("Looks like you wandered off the map! 🍳");