const nav_items = document.getElementById('nav-items');
const item_img = document.getElementById('item-img');

const details_img = document.getElementById('details-img');
const btn = document.getElementById("dark-mode");
const title = document.getElementById("projects-title");

const items = document.getElementsByClassName("item");
const buttons = document.querySelectorAll(".md-close");
const overlay = document.getElementById("overlay");

const question_input = document.getElementById("question");
const ask_btn = document.getElementById("button");

ask_btn.addEventListener('click', getAnswer);

question_input.addEventListener('change', update);

var question = "";
function update(){
  question = question_input.value;
}

function getAnswer(){
  const passage = "My name is Luis Mario. This is my personal portfolio. Here I show you all my projects. I'm 19 years old. I'm a student and a programmer. I live in Venezuela and I can design websites for you and I can write blog post. I can build simple Machine Learning models.";
  console.log(passage);
  console.log(question);
  // Load the model.
  qna.load().then(model => {
    // Find the answers
    model.findAnswers(question, passage).then(answers => {
      console.log('Answers: ', answers);
      question_input.parentElement.innerHTML += `<p>${answers[0].text}</p>`;
      question_input.value = "";
    });
  });
}

for(let i=0; i < items.length; i++){
  items[i].addEventListener('click', function (){
    const modal = items[i].children[2];
    openModal(modal);
  }, false);
}

buttons.forEach(button => {
  button.addEventListener('click', function (){
     const modal = button.closest('.md.md-show');
     closeModal(modal);
  });
})
console.log(buttons);

overlay.addEventListener('click', function (){
  const modals = document.querySelectorAll(".md.md-show");
  modals.forEach(modal => {
    closeModal(modal);
  });
});

function openModal(modal){
  if(modal == null){
    return;
  }
  if (!modal.classList.contains('md-show')){
    modal.classList.add("md-show"); //toggle
    overlay.classList.add("md-show");
  }
}
function closeModal(modal){
  if(modal == null){
    return;
  }
  if (!modal.classList.contains('md-show')){
    modal.classList.remove("md-show");
    overlay.classList.remove("md-show");
  }
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
      var theme = document.body.classList.contains("light-mode") ? "light" : "dark";
      // Otherwise...
    } else {
      // ...apply the .dark-theme class to override the default light styles
      document.body.classList.toggle("dark-theme");
      var theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    }
    localStorage.setItem("theme", theme);
  });