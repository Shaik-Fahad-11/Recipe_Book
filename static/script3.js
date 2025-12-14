const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  searchToggle = document.querySelector(".searchToggle"),
  searchField = document.querySelector(".search-field"),
  sidebarOpen = document.querySelector(".sidebarOpen"),
  siderbarClose = document.querySelector(".siderbarClose");


let getMode = localStorage.getItem("mode");

if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

// js code to toggle dark and light mode

modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");

  // js code to keep user selected mode even page refresh or file reopen

  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

// js code to toggle search box

// Toggle the search box open/close
searchToggle.addEventListener("click", () => {
  searchToggle.classList.toggle("active");

  // Optional: Focus on the input when opened
  if (searchToggle.classList.contains("active")) {
    setTimeout(() => {
      searchField.querySelector("input").focus();
    }, 300);
  }
});


//   js code to toggle sidebar

sidebarOpen.addEventListener("click", () => {
  nav.classList.add("active");
});
body.addEventListener("click", e => {
  let clickedElm = e.target;
  if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
    nav.classList.remove("active");
  }
});


const footer = document.querySelector("footer");

// Function to toggle dark/light mode for the footer

function toggleFooterMode() {

  footer.classList.toggle("dark");
}

// Call the function when the modeToggle button is clicked

modeToggle.addEventListener("click", () => {
  toggleFooterMode();
});




const copyRightText = document.querySelector(".CopyRightText");

// Function to toggle dark/light mode for the copyright section

function toggleCopyRightMode() {
  copyRightText.classList.toggle("dark");
}

// Call the function when the modeToggle button is clicked

modeToggle.addEventListener("click", () => {
  toggleCopyRightMode();
});



const heading = document.querySelector(".heading");

// Function to toggle dark/light mode for the heading
function toggleHeadingMode() {
  heading.classList.toggle("dark");
}

// Call the function when the modeToggle button is clicked
modeToggle.addEventListener("click", () => {
  toggleHeadingMode();
});