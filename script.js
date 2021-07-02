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