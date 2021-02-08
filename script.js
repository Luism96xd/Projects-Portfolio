const nav_items = document.getElementById('nav-items');

const details_img = document.getElementById('details-img');
const btn = document.getElementById("dark-mode");
const title = document.getElementById("projects-title");

const items = document.getElementsByClassName("item");
const buttons = document.querySelectorAll(".md-close");
const overlay = document.getElementById("overlay");

for(let i=0; i < items.length; i++){
  items[i].addEventListener('click', function (){
    const modal = this.querySelector('.md');
    openModal(modal);
  }, false);
}

buttons.forEach(button => {
  button.addEventListener('click', function (){
    console.log("clicked"); 
    const modal = button.closest('.md .md-show');
    closeModal(modal);
  });
}, false);

overlay.addEventListener('click', function (){
  console.log("clicked overlay");
  const modals = document.querySelectorAll(".md.md-show");

  modals.forEach(modal => {
    closeModal(modal);
  });
}, false);

function openModal(modal){
  modal.classList.add("md-show"); //toggle
  overlay.classList.add("md-show");
}
function closeModal(modal){
  modal.classList.remove("md-show");
  overlay.classList.remove("md-show");
}
window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    /*console.log(document.body.style.getPropertyValue('--scroll'));*/
    if(document.body.style.getPropertyValue('--scroll') >= 0.10){
        nav_items.className = "side-menu";
    }else{
        nav_items.removeAttribute('class', 'side-menu');
    }
    if(document.body.style.getPropertyValue('--scroll') >= 0.36){
        title.style.display = "block";
        title.style.animationPlayState = "running";
    }else{
        title.style.display = "none";
        title.style.animationFillMode = "forwards";
        title.style.animationPlayState = "paused";
    }
}, false);

// Get the user's theme preference from local storage, if it's available
const currentTheme = localStorage.getItem("theme");
// If the user's preference in localStorage is dark...
if (currentTheme == "dark") {
  // ...let's toggle the .dark-theme class on the body
  document.body.classList.toggle("dark-mode");
// Otherwise, if the user's preference in localStorage is light...
} else if (currentTheme == "light") {
  // ...let's toggle the .light-theme class on the body
  document.body.classList.toggle("light-mode");
}

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

btn.addEventListener("click", function() {
    // If the OS is set to dark mode...
    if (prefersDarkScheme.matches) {
      // ...then apply the .light-theme class to override those styles
      document.body.classList.toggle("light-theme");
      document.getElementsByClassName("moon")[0].classList.toggle(".dark-mode");
      var theme = document.body.classList.contains("light-mode") ? "light" : "dark";
      // Otherwise...
    } else {
      // ...apply the .dark-theme class to override the default light styles
      document.body.classList.toggle("dark-theme");
      var theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    }
    localStorage.setItem("theme", theme);
  });