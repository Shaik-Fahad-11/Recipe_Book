const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  searchToggle = document.querySelector(".searchToggle"),
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

searchToggle.addEventListener("click", () => {
  searchToggle.classList.toggle("active");
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



const backgroundMusic = document.getElementById('backgroundMusic');
const floatingButton = document.getElementById('floatingButton');

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    floatingButton.innerText = 'Pause Music';
  } else {
    backgroundMusic.pause();
    floatingButton.innerText = 'Play Music';
  }
}




//JavaScript code to toggle dark/light mode for the recipe section
const recipeSection = document.querySelector(".recipe-section");

function toggleRecipeSectionMode() {
  recipeSection.classList.toggle("dark");
}

// Call the function when the modeToggle button is clicked
modeToggle.addEventListener("click", () => {
  toggleRecipeSectionMode();
});





function redirect() {
  var pageName = document.getElementById("pageInput").value.toLowerCase();

  if (pageName) {
    if (pageName === "fish fry") {
      window.location.href = "Fish_Fry.html";
    } else if (pageName === "chicken tandoori") {
      window.location.href = "Chicken_Tandoori.html";
    } else if (pageName === "chicken lollipop") {
      window.location.href = "Chicken_Lollipop.html";
    } else if (pageName === "mandi") {
      window.location.href = "Mandi.html";
    } else if (pageName === "sri lankan crab curry") {
      window.location.href = "Sri_Lankan_Crab_Curry.html";
    } else if (pageName === "rajma") {
      window.location.href = "Rajma.html";
    } else if (pageName === "pav bhaji") {
      window.location.href = "Pav_Bhaji.html";
    } else if (pageName === "rasgulla") {
      window.location.href = "Rasgulla.html";
    } else if (pageName === "rasmalai") {
      window.location.href = "Rasmalai.html";
    } else if (pageName === "masoor dal") {
      window.location.href = "Masoor_Dal.html";
    } else if (pageName === "squid curry") {
      window.location.href = "Squid_Curry.html";
    } else if (pageName === "mysore pak") {
      window.location.href = "Mysore_Pak.html";
    } else if (pageName === "samosa") {
      window.location.href = "Samosa.html";
    } else if (pageName === "gobi manchurian") {
      window.location.href = "Gobi_Manchurian.html";
    } else if (pageName === "thai coconut shrimp") {
      window.location.href = "Air_Fryer_Thai_Coconut_Shrimp.html";
    } else if (pageName === "aloo gobi") {
      window.location.href = "Aloo_Gobi.html";
    } else if (pageName === "butter chicken") {
      window.location.href = "Butter_Chicken.html";
    } else if (pageName === "air fryer calamari with chipotle dipping sauce") {
      window.location.href = "Air_Fryer_Calamari_With_Chipotle_Dipping_Sauce.html";
    } else if (pageName === "butter garlic snails") {
      window.location.href = "Butter_Garlic_Snails.html";
    } else if (pageName === "baingan bharta") {
      window.location.href = "Baingan_Bharta.html";
    } else if (pageName === "barfi") {
      window.location.href = "Barfi.html";
    } else if (pageName === "chana masala") {
      window.location.href = "Chana_Masala.html";
    } else if (pageName === "oysters") {
      window.location.href = "Char-Grilled_Honey_Parmesan_Oysters.html";
    } else if (pageName === "aloo methi") {
      window.location.href = "Aloo_Methi.html";
    } else if (pageName === "chicken 65") {
      window.location.href = "Chicken_65.html";
    } else if (pageName === "chicken curry") {
      window.location.href = "Chicken_Curry.html";
    } else if (pageName === "chicken alfaham") {
      window.location.href = "Chicken_Al-Faham.html";
    } else if (pageName === "jalebi") {
      window.location.href = "Jalebi.html";
    } else if (pageName === "gajar ka halwa") {
      window.location.href = "Gajar_Ka_Halwa.html";
    } else if (pageName === "dragon chicken") {
      window.location.href = "Dragon_Chicken.html";
    } else if (pageName === "crab salad") {
      window.location.href = "Crab_Salad.html";
    } else if (pageName === "veg manchow soup") {
      window.location.href = "Veg_Manchow_Soup.html";
    } else if (pageName === "paneer butter masala") {
      window.location.href = "Paneer_Butter_Masala.html";
    } else if (pageName === "shawarma") {
      window.location.href = "Shawarma.html";
    } else if (pageName === "vegetable biriyani") {
      window.location.href = "Vegetable_Biriyani.html";
    } else if (pageName === "recheado masala fish") {
      window.location.href = "Recheado_Masala_Fish.html";
    } else if (pageName === "rogan josh") {
      window.location.href = "Rogan_Josh.html";
    } else if (pageName === "shahi tukda") {
      window.location.href = "Shahi_Tukda.html";
    } else if (pageName === "mutton nihari") {
      window.location.href = "Mutton_Nihari.html";
    } else if (pageName === "mutton curry") {
      window.location.href = "Mutton_Curry.html";
    } else if (pageName === "prawn curry") {
      window.location.href = "South_Indian_Prawn_Curry.html";
    } else if (pageName === "prawn puri") {
      window.location.href = "Prawn_Puri.html";
    } else if (pageName === "spring rolls") {
      window.location.href = "Spring_Rolls.html";
    } else if (pageName === "mutton marag") {
      window.location.href = "Mutton_marag.html";
    } else if (pageName === "sheer khurma") {
      window.location.href = "Sheer_Khurma.html";
    } else if (pageName === "chilli chicken") {
      window.location.href = "Chilli_Chicken.html";
    } else if (pageName === "idli sambar") {
      window.location.href = "Idli_Sambar.html";
    } else if (pageName === "schezwan fried rice") {
      window.location.href = "Schezwan_Fried_Rice.html";
    } else if (pageName === "paneer chilli") {
      window.location.href = "Paneer_Chilli.html";
    } else if (pageName === "dal tadka") {
      window.location.href = "Dal_Tadka.html";
    } else if (pageName === "palak paneer") {
      window.location.href = "Palak_Paneer.html";
    } else if (pageName === "hakka noodles") {
      window.location.href = "Hakka_Noodles.html";
    } else if (pageName === "chicken red masala") {
      window.location.href = "Chicken_Red_Masala.html";
    } else if (pageName === "malai kofta") {
      window.location.href = "Malai_Kofta.html";
    } else if (pageName === "ladoo") {
      window.location.href = "Ladoo.html";
    } else if (pageName === "kerala style fish") {
      window.location.href = "Kerala_Style_Fish_Fry.html";
    } else if (pageName === "mutton biriyani") {
      window.location.href = "Mutton_Biriyani.html";
    } else if (pageName === "momos") {
      window.location.href = "Momos.html";
    } else if (pageName === "dhokla") {
      window.location.href = "Dhokla.html";
    } else if (pageName === "kheer") {
      window.location.href = "Kheer.html";
    } else if (pageName === "pad thai yield") {
      window.location.href = "Pad_Thai_Yield.html";
    } else if (pageName === "gulab jamun") {
      window.location.href = "Gulab_Jamun.html";
    } else if (pageName === "honey chilli potatoes") {
      window.location.href = "Honey_Chilli_Potatoes.html";
    } else if (pageName === "grilled octopus") {
      window.location.href = "Grilled_Octopus.html";
    } else if (pageName === "crab salad") {
      window.location.href = "Crab_Salad.html";
    } else if (pageName === "chicken biriyani") {
      window.location.href = "Chicken_Biriyani.html";
    } else {
      alert("The recipe you are searching for is currently not available.");
    }
  }
}
