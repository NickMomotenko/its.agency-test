import { data } from "./mockData.js";

import {
  updateBasketData,
  busketList,
  getBusketGeneralCounter,
  updateBasketCounterValue,
  decrementProduct,
  deleteFromBusket,
  generateCorrectTotalText,
} from "./basket.js";

let productArr = [...data];

const productContainer = document.querySelector(".product__list");

const generateProductList = (arr = productArr) => {
  let listStr = "";

  for (let item of arr) {
    listStr += `
          <li class="product__item card" data-id=${item.id}>
              <div class="card__img">
                  <img
                      src=${item.image}
                      alt=""
                      class="card__img-picture"
                  />
              </div>
              <div class="card__title">
                  ${item.title}
              </div>
              <div class="card__row">
                  <div class="card__price">
                      <span class="card__price-value">${item.price}</span>
                      <span class="card__price-currency">₽</span>
                  </div>
                  <button class="card__button-add">
                      <img src="./img/plus.svg" alt="plus icon" class="card__button-add-icon" />
                  </button>
              </div>
          </li>
        `;
  }

  productContainer.innerHTML = listStr;
  generateCorrectTotalText();
};

generateProductList();

productContainer.addEventListener("click", (event) => {
  const target = event.target;

  if (
    target.classList.contains("card__button-add") ||
    target.classList.contains("card__button-add-icon")
  ) {
    const parentLI = target.closest(".card");

    const id = parentLI.dataset.id;
    const imgUrl = parentLI.querySelector(".card__img-picture").src;
    const title = parentLI.querySelector(".card__title").textContent;
    const price = parentLI.querySelector(".card__price");

    const priceCurrency = price.querySelector(
      ".card__price-currency"
    ).textContent;
    const priceValue = price.querySelector(".card__price-value").textContent;

    const product = {
      id,
      icon: imgUrl,
      title,
      price: {
        value: priceValue,
        currency: priceCurrency,
      },
      counter: 1,
    };

    updateBasketData(product);
    updateBasketCounterValue();
  }
});

export {
  busketList,
  productArr,
  generateProductList,
  updateBasketCounterValue,
  deleteFromBusket,
  updateBasketData,
  decrementProduct,
  getBusketGeneralCounter,
  generateCorrectTotalText,
};
