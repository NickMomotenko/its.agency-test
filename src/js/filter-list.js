import { productArr } from "./product.js";

import { generateProductList } from "./product.js";

import { generateCorrectLabel } from "./helpers.js";

// const filterList = document.querySelector(".filter-list");
const checkboxList = Array.from(document.querySelectorAll(".checkbox__body"));
const totalProductCounter = document.querySelector(".product-counter");

let filterResult = [...productArr];

let filterArr = [];

updateTolalProductCounter();

function updateTolalProductCounter() {
  totalProductCounter.textContent = `${
    filterResult.length
  } ${generateCorrectLabel(filterResult.length)}`;
}

function filterBy(arr) {
  let data = [];

  for (let item of arr.length ? filterResult : [...productArr]) {
    if (arr.every((filterStr) => item.labels.includes(filterStr))) {
      data.push(item);
    }
  }

  filterResult = [...data];

  updateTolalProductCounter();

  generateProductList(filterResult);
}

function sortBy(filter) {
  switch (filter) {
    case "expensive": {
      filterResult = filterResult.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );

      generateProductList(filterResult);
      updateTolalProductCounter();
      return filterResult;
    }

    case "cheap": {
      filterResult.sort((a, b) => Number(a.price) - Number(b.price));

      generateProductList(filterResult);
      updateTolalProductCounter();
      return filterResult;
    }

    default:
      return;
  }
}

checkboxList.forEach((checkbox) => {
  const dataAttr = checkbox.dataset.filter;

  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      filterArr = [...filterArr, dataAttr];
      filterBy(filterArr);
    } else {
      filterArr = filterArr.filter((item) => item !== dataAttr);
      filterBy(filterArr);
    }
  });
});

export { filterResult, sortBy };
