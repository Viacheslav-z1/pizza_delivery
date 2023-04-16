$(function () {
  const openBtn = document.querySelector(".menu__open");
  const closeBtn = document.querySelector(".menu__close");
  const menu = document.querySelector(".menu__list");
  const formNode = document.querySelector(".form");

  const openForm = document.querySelector(".basket__openForm");
  const closeForm = document.querySelector(".form__close");
  const basket = document.querySelector(".basket");
  const closeBasker = document.querySelector(".basket__close");
  const basketOpen = document.querySelector(".menu__basket");

  let basketList = document.querySelector(".basket__list");
  let basketTotalPrice = document.querySelector(".basket__total__price");

  let busketArr = [];
  let total = 0;





  const anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
       menu.classList.remove("open");

      const blockID = anchor.getAttribute("href").substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }







  /**Відправка даних */

  const form = document.querySelector(".form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent the form from submitting through the default HTML form submit
    const nameInput = document.querySelector(".form__name");
    const addressInput = document.querySelectorAll(".form__input")[1];
    const phoneInput = document.querySelectorAll(".form__input")[2];

    const formData = {
      name: nameInput.value,
      address: addressInput.value,
      phone: phoneInput.value,
      food: busketArr,
    };

    fetch("https://pizza-b8ec4-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => console.error(error));

    form.reset();
    alert("Замовлення відправлено!");
    formNode.classList.remove("open");
    busketArr = 0;
    total = 0;
  });





  function calcTotalPrice(arr) {
    total = 0;
    arr.forEach((item) => {
      total = total + +item.priceNum * item.count;
    });
    basketTotalPrice.innerHTML = `${total} Грн`;
  }

  function renderBasket(arr) {
    let item = arr
      .map((item) => {
        let toppingsHt = item.toppings
          .map((top) => {
            return `
        <li class="basket__plus-item">
          ${top}
        </li>
        `;
          })
          .join(" ");

        return `<li class="basket__item">
            <div class="basket__info">
              <div class="basket__box">
                <h3 class="basket__name">${item.name} ${item.size}</h3>
                <p class="basket__num">${item.count} Шт.</p>
              </div>
              <p class="basket__price">
                ${item.price}
              </p>
            </div>
            <h4 class="basket__plus">
              Добавки
            </h4>
            <ul class="basket__plus-list">
            ${toppingsHt}
            </ul>
          </li>`;
      })
      .join(" ");

    basketList.innerHTML = item;

    calcTotalPrice(busketArr);
  }

  /*Логіка піци*/

  let allPizzas = document.querySelectorAll(".tovars__item");

  allPizzas.forEach((pizza, index) => {
    calculatePrice(index + 1);

    const firstInput = document.querySelector(`#pizza-size-${index + 1}`);
    firstInput.addEventListener("change", function () {
      calculatePrice(index + 1);
    });

    const secondInput = document.querySelector(`#pizza-quantity-${index + 1}`);
    secondInput.addEventListener("change", function () {
      calculatePrice(index + 1);
    });

    let checboxes = document.querySelectorAll(`#pizza-toppings-${index + 1}`);
    checboxes.forEach((element) => {
      element.addEventListener("change", function () {
        calculatePrice(index + 1);
      });
    });
  });

  function calculatePrice(pizzaNumber) {
    const sizeSelect = document.getElementById(`pizza-size-${pizzaNumber}`);
    const quantityInput = document.getElementById(
      `pizza-quantity-${pizzaNumber}`
    );
    const priceOutput = document.getElementById(`pizza-price-${pizzaNumber}`);

    const size = sizeSelect.value;
    const quantity = quantityInput.value;

    let price = +sizeSelect.getAttribute("data-price");

    if (size === "small") {
      price = Math.round(price * 1);
    } else if (size === "medium") {
      price = Math.round(price * 1.4);
    } else if (size === "large") {
      price = Math.round(price * 1.8);
    }

    price *= quantity;

    const toppings = document.getElementsByName(
      `pizza-toppings-${pizzaNumber}`
    );
    for (let i = 0; i < toppings.length; i++) {
      if (toppings[i].checked) {
        const toppingPrice = +toppings[i].getAttribute("data-price");
        console.log(toppingPrice);
        price += toppingPrice;
      }
    }

    priceOutput.innerHTML = `Ціна: ${price} грн.`;
  }

  let addToCartButtons = document.querySelectorAll(".tovars__btn");

  addToCartButtons.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      // Отримуємо назву піци
      let pizzaName = document.querySelector(
        `.tovars__name-${index + 1}`
      ).textContent;

      // Отримуємо розмір піци
      let pizzaSizeSelect = document.querySelector(`#pizza-size-${index + 1}`);
      let pizzaSize =
        pizzaSizeSelect.options[pizzaSizeSelect.selectedIndex].textContent;

      // Отримуємо кількість піц
      let pizzaQuantity = document.querySelector(
        `#pizza-quantity-${index + 1}`
      ).value;

      // Отримуємо ціну піци
      let pizzaPrice = document.querySelector(
        `#pizza-price-${index + 1}`
      ).textContent;

      let pizzaNumPrice = +pizzaSizeSelect.getAttribute("data-price");

      // Отримуємо обрані топінги піци
      let toppingsList = document.querySelectorAll(
        `#pizza-toppings-${index + 1}`
      );
      let toppings = [];
      toppingsList.forEach(function (topping) {
        if (topping.checked) {
          toppings.push(topping.labels[0].textContent.trim());
        }
      });

      // Створюємо об'єкт з інформацією про піцу

      pizzaNumPrice = pizzaNumPrice * pizzaQuantity;
      let pizzaObject = {
        name: pizzaName,
        size: pizzaSize,
        count: pizzaQuantity,
        price: pizzaPrice,
        priceNum: pizzaNumPrice,
        toppings: toppings,
      };

      // Додаємо об'єкт з піцею до корзини

      busketArr.push(pizzaObject);
      renderBasket(busketArr);
      calcTotalPrice(busketArr);

      basket.classList.add("open");
    });
  });
  // Додаємо обробник події на кнопку "Додати в кошик"

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.add("open");
  });

  openForm.addEventListener("click", (e) => {
    e.preventDefault();
    formNode.classList.add("open");
    basket.classList.remove("open");
  });

  closeForm.addEventListener("click", (e) => {
    e.preventDefault();
    formNode.classList.remove("open");
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
  });

  basketOpen.addEventListener("click", (e) => {
    e.preventDefault();
    basket.classList.add("open");
  });

  closeBasker.addEventListener("click", (e) => {
    e.preventDefault();
    basket.classList.remove("open");
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
    infinite: false,
    prevArrow:
      '<button type="button" class="slick-prev"><img class="slick-img" src="../images/arrow-left.svg" alt=""></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img class="slick-img" src="../images/arrow-right.svg" alt=""></button>',
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
