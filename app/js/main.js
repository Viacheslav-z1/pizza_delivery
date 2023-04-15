$(function () {
  const openBtn = document.querySelector(".menu__open");
  const closeBtn = document.querySelector(".menu__close");
  const menu = document.querySelector(".menu__list");

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.add("open");
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
  });

  function closeMenu() {
    menu.classList.remove("open");
  }
  function openMenu() {
    menu.classList.add("open");
  }
});
