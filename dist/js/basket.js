import { generateCorrectLabel } from "./helpers.js";

const basket = document.querySelector(".basket");
const wrapper = document.querySelector(".wrapper");

const basketCounter = document.querySelectorAll(".basket-counter"); // две кнопки (кружок с счетсчиком)

const basketCrossButton = document.querySelector(".basket__cross-btn"); // кнопка закрыть корзину

const basketContainer = document.querySelector(".basket__list-body"); // сюда рендерим li-шки

const basketClearData = document.querySelector(".basket__clear-btn"); // кнопка очистка корзины
const basketOrderButton = document.querySelector(".basket__order-btn"); // кнопка оформить

const busketCounter = Array.from(document.querySelectorAll(".counter-value")); // значения в кружках
const basketCounterValue = document.querySelector(".basket__list-counter"); // значение в корзине

const priceValue = document.querySelector(".basket__total-price"); // общая стоимость в корзине

let busketList = [];

function toggleBasketOpen() {
  wrapper.classList.toggle("active");
  basket.classList.toggle("active");
  generateBasketList();
  getTotalPrice();
}

function generateBasketList(arr = busketList) {
  let basketStr = "";

  for (const item of arr) {
    basketStr += `
      <li class="basket__list-item" data-id=${item.id}>
        <div class="basket__list-content">
          <img src=${item.icon} alt="" class="basket__list-icon" />
          <div class="basket__list-data">
            <div class="basket__list-title">
            ${item.title}
            </div>
            <div class="basket__list-price">${item.price?.value}</div>
          </div>
        </div>
        <div class="basket__list-options">
          <div class="basket__list-counter-block">
            <button class="basket__list-counter-btn basket__list-counter-btn--minus">-</button>
            <div class="basket__list-counter-value">${item.counter}</div>
            <button class="basket__list-counter-btn basket__list-counter-btn--plus">+</button>
          </div>
          <button class="basket__list-delete-btn"></button>
        </div>
      </li>
      `;
  }

  basketContainer.innerHTML = basketStr;
  generateCorrectTotalText();
}

function updateBasketData(arg) {
  let isObj = typeof arg === "object";

  function update(id) {
    busketList = busketList.map((item) => {
      if (item.id === id) {
        return { ...item, counter: item.counter + 1 };
      }

      return item;
    });

    generateCorrectTotalText();
  }

  if (!isObj) {
    let product = busketList.find((item) => item.id === arg);

    update(product.id);
  } else {
    let product = busketList.find((item) => item.id === arg.id);

    if (product) {
      update(product.id);
    } else {
      busketList = [...busketList, arg];
    }
  }
}

// обновляем все счетсчики
function updateBasketCounterValue() {
  for (const counter of busketCounter) {
    counter.innerText = getBusketGeneralCounter();
  }
}

function getBusketGeneralCounter() {
  let counter = busketList.reduce(
    (accumulator, item) => accumulator + item.counter,
    0
  );

  return counter;
}

function getTotalPrice() {
  let totalPrice = busketList.reduce(
    (accumulator, item) =>
      accumulator + Number(item.price.value) * item.counter,
    0
  );

  priceValue.textContent = totalPrice;
}

// формируем заказ и чистим корзину
function order() {
  alert("Ваш заказ оформлен!!");

  clearBusket();
}

function clearBusket() {
  busketList = [];
  updateBasketCounterValue();

  generateBasketList();
  getTotalPrice();
}

function decrementProduct(id) {
  busketList = busketList.map((product) => {
    if (product.id === id) {
      if (product.counter === 1) {
        return product;
      }

      return { ...product, counter: product.counter - 1 };
    }

    return product;
  });
}

function deleteFromBusket(id) {
  busketList = busketList.filter((item) => item.id !== id);
}

function generateCorrectTotalText() {
  basketCounterValue.textContent = `${getBusketGeneralCounter()} ${generateCorrectLabel(
    getBusketGeneralCounter()
  )}`;
}

basketCounter.forEach((button) => {
  button.addEventListener("click", toggleBasketOpen);
});

basketCrossButton.addEventListener("click", toggleBasketOpen);

basketContainer.addEventListener("click", (event) => {
  const target = event.target;

  const parentLI = target.closest(".basket__list-item");

  const parentId = parentLI.dataset.id;

  if (target.classList.contains("basket__list-delete-btn")) {
    deleteFromBusket(parentId);
    generateBasketList();
    getTotalPrice();
  }

  if (target.classList.contains("basket__list-counter-btn--plus")) {
    updateBasketData(parentId);
    generateBasketList();
    getTotalPrice();
  }

  if (target.classList.contains("basket__list-counter-btn--minus")) {
    decrementProduct(parentId);

    generateBasketList();
    getTotalPrice();
  }

  updateBasketCounterValue();
});

basketClearData.addEventListener("click", clearBusket);

basketOrderButton.addEventListener("click", order);

export {
  updateBasketData,
  busketList,
  getBusketGeneralCounter,
  updateBasketCounterValue,
  decrementProduct,
  deleteFromBusket,
  generateCorrectTotalText,
};
