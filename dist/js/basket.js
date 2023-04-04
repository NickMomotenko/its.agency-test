import {
  busketList,
  updateBasketData,
  updateBasketCounterValue,
  clearData,
  deleteFromBusket,
  decrementProduct,
} from "./product.js";

const basket = document.querySelector(".basket");
const wrapper = document.querySelector(".wrapper");

const basketCounter = document.querySelector(".basket-counter");

const basketCrossButton = document.querySelector(".basket__cross-btn");
const basketContainer = document.querySelector(".basket__list-body");
const basketClearData = document.querySelector(".basket__clear-btn");
const basketOrderButton = document.querySelector(".basket__order-btn");

const priceValue = document.querySelector(".basket__total-price");

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
}

function getTotalPrice() {
  let totalPrice = busketList.reduce(
    (accumulator, item) =>
      accumulator + Number(item.price.value) * item.counter,
    0
  );

  priceValue.textContent = totalPrice;
}

function order() {
  alert("Ваш заказ оформлен!!");
  clearData();
  generateBasketList();
  getTotalPrice();
}

function clearBusket() {
  clearData();
  generateBasketList();
  getTotalPrice();
}

basketCounter.addEventListener("click", toggleBasketOpen);
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
