const nav_items = document.getElementById('nav-items');
const btn = document.getElementById("dark-mode");
const title = document.getElementById("projects-title");
const buttons = document.querySelectorAll(".md-close");

// Stack of modals
let currentlyOpenModals = [];
const noModalsOpen = () => !currentlyOpenModals.length;

const modalTriggers = document.querySelectorAll(".item");

modalTriggers.forEach(modalTrigger => {
  modalTrigger.addEventListener('click', clickEvent => {
    console.log("clicked!")
    const trigger = clickEvent.target;
    console.log(trigger);
    const modalId = trigger.getAttribute("data-modal-id");
    console.log(modalId);
    openModal(modalId);
  });
});

function openModal(modalId){
  const modalWrapper = document.getElementById(modalId);
  modalWrapper.classList.add("visible");
  currentlyOpenModals.push(modalWrapper);
}
function closeModal(){
  if (noModalsOpen()) {
    return;
  }
  const modalWrapper = currentlyOpenModals[currentlyOpenModals.length - 1];
  modalWrapper.classList.remove("visible");
  currentlyOpenModals.pop();
}

buttons.forEach(button => {
  button.addEventListener('click', function (){
    console.log("clicked"); 
    const modal = button.closest('.modal-wrapper.visible');
    closeModal(modal);
  });
}, false);


const modalWrappers = document.querySelectorAll(".modal-wrapper");
modalWrappers.forEach(modalWrapper => {
  modalWrapper.addEventListener("click", () => {
    closeModal();
  });
});

document.body.addEventListener("keyup", keyEvent => {
  if (keyEvent.key === "Escape") {
    closeModal();
  }
});


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