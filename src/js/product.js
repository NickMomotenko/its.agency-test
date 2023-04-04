(() => {
  const data = [
    {
      id: 1,
      image: "../img/products/1.png",
      title: "Краска Wallquest, Brownsone MS90102",
      price: "6000",
    },
    {
      id: 2,
      image: "../img/products/2.png",
      title: "Краска Wallquest 2222, Brownsone MS90102",
      price: "4444",
    },
    {
      id: 3,
      image: "../img/products/1.png",
      title: "Краска Wallquest, Brownsone MS90102",
      price: "6000",
    },
    {
      id: 4,
      image: "../img/products/2.png",
      title: "Краска Wallquest 2222, Brownsone MS90102",
      price: "4444",
    },
    {
      id: 5,
      image: "../img/products/1.png",
      title: "Краска Wallquest, Brownsone MS90102",
      price: "6000",
    },
  ];

  let busketList = [];

  const productContainer = document.querySelector(".product__list");
  const busketCounter =
    document.querySelector(".basket-counter").firstElementChild;

  const generateProductList = () => {
    let listStr = "";

    for (const item of data) {
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
  };

  generateProductList();

  const productList = document.querySelector(".product__list");

  productList.addEventListener("click", (event) => {
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

      if (busketList.some((item) => item.id === product.id)) {
        busketList = busketList.map((item) => {
          if (item.id === product.id) {
            return { ...item, counter: item.counter + 1 };
          }

          return item;
        });
      } else {
        busketList = [...busketList, product];
      }

      let busketListGeneralCounter = busketList.reduce(
        (accumulator, item) => accumulator + item.counter,
        0
      );

      busketCounter.innerText = busketListGeneralCounter;
      console.log(busketList);
    }
  });
})();
