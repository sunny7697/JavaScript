"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelectorAll(".show-modal");
const btnCloseModal = document.querySelector(".close-modal");

const openModal = function () {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Adding click event listener to all the modal buttons.
for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener("click", openModal);
}

// Adding event listener to close the modal.
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

// We really use the functionality of adding and removing the classes all the time inorder to change the appearance of elements on our page.
// And that's because classes allow us to basically aggregate multiple CSS properties in just one like a container with a lot of properties in it.
// So, by adding and removing them we can activate and deactive certain styles all at the same time.
