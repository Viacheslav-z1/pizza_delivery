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








  /*slick */

    $(".tovars__list").slick({
      slidesToShow: 5,
      prevArrow:
        '<button type="button" class="slick-prev"><img src="../images/arrow-left.svg" alt=""></button>',
      nextArrow:
        '<button type="button" class="slick-next"><img src="../images/arrow-right.svg" alt=""></button>',
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
});
