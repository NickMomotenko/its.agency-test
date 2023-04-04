let data = [
  {
    id: "3",
    icon: "http://localhost:3000/img/products/1.png",
    title:
      "\n                  Краска Wallquest, Brownsone MS90102\n              ",
    price: {
      value: "6000",
      currency: "₽",
    },
    counter: 1,
  },
  {
    id: "2",
    icon: "http://localhost:3000/img/products/2.png",
    title:
      "\n                  Краска Wallquest 2222, Brownsone MS90102\n              ",
    price: {
      value: "4444",
      currency: "₽",
    },
    counter: 1,
  },
  {
    id: "1",
    icon: "http://localhost:3000/img/products/1.png",
    title:
      "\n                  Краска Wallquest, Brownsone MS90102\n              ",
    price: {
      value: "6000",
      currency: "₽",
    },
    counter: 1,
  },
];

(() => {
  const basket = document.querySelector(".basket");

  const basketCounter = document.querySelector(".basket-counter");
  const basketCrossButton = document.querySelector(".basket__cross-btn");
  const basketContainer = document.querySelector(".basket__list-body");
  const basketClearData = document.querySelector(".basket__clear-btn");
  const basketCounterValue = document.querySelector(".basket__list-counter");

  const priceValue = document.querySelector(".basket__total-price");

  function toggleBasketOpen() {
    basket.classList.toggle("active");
  }

  basketCounter.addEventListener("click", toggleBasketOpen);
  basketCrossButton.addEventListener("click", toggleBasketOpen);

  function generateBasketList(arr = data) {
    let basketStr = "";

    for (const item of arr) {
      basketStr += `
      <li class="basket__list-item" data-id=${item.id}>
        <img src=${item.icon} alt="" class="basket__list-icon" />
        <div class="basket__list-data">
          <div class="basket__list-title">
           ${item.title}
          </div>
          <div class="basket__list-price">${item.price.value}</div>
        </div>
        <div class="basket__list-counter">
          <button class="basket__list-counter-btn basket__list-counter-btn--minus">-</button>
          <div class="basket__list-counter-value">${item.counter}</div>
          <button class="basket__list-counter-btn basket__list-counter-btn--plus">+</button>
        </div>
        <button class="basket__list-delete-btn">delete</button>
      </li>
      `;
    }

    basketContainer.innerHTML = basketStr;
  }

  function getTotalPrice() {
    let totalPrice = data.reduce(
      (accumulator, item) =>
        accumulator + Number(item.price.value) * item.counter,
      0
    );

    priceValue.textContent = totalPrice;
  }

  function getBasketLength() {
    let basketLength = data.reduce(
      (accumulator, item) => accumulator + item.counter,
      0
    );

    return basketLength;
  }

  function clearData() {
    data = [];
    generateBasketList(data);
    getTotalPrice();
  }

  function updateBasketCounterValue() {
    basketCounterValue.firstElementChild.textContent = getBasketLength();
  }

  generateBasketList();
  getTotalPrice();
  updateBasketCounterValue();

  basketContainer.addEventListener("click", (event) => {
    const target = event.target;

    const parentLI = target.closest(".basket__list-item");

    const parentId = parentLI.dataset.id;

    if (target.classList.contains("basket__list-delete-btn")) {
      data = data.filter((product) => product.id !== parentId);

      generateBasketList(data);
      getTotalPrice();
    }

    if (target.classList.contains("basket__list-counter-btn--plus")) {
      data = data.map((product) => {
        if (product.id === parentId) {
          return { ...product, counter: product.counter + 1 };
        }

        return product;
      });

      generateBasketList(data);
      getTotalPrice();
    }

    if (target.classList.contains("basket__list-counter-btn--minus")) {
      data = data.map((product) => {
        if (product.id === parentId) {
          if (product.counter === 1) {
            return product;
          }

          return { ...product, counter: product.counter - 1 };
        }

        return product;
      });

      generateBasketList(data);
      getTotalPrice();
    }

    updateBasketCounterValue();
  });

  basketClearData.addEventListener("click", clearData);
})();
