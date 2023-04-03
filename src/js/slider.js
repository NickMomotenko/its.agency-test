(() => {
  const buttonsContainer = document.querySelector(".slider__direction");

  const sliderContainer = document.querySelector(".slider__container");
  const sliderArr = document.querySelectorAll(".slider__item");

  const optionContainer = document.querySelector(".slider__controlls");
  const optionList = Array.from(
    document.querySelectorAll(".slider__controlls-item")
  );

  let currentIndex = 0;

  const doTransitionByIndex = (index) => {
    sliderContainer.style.transform = `translateX(-${index * 100}%)`;
  };

  const addClass = (index) => {
    optionList.forEach((item, ind) => {
      if (ind !== index) {
        item.classList.remove("active");
      } else item.classList.add("active");
    });

    sliderArr.forEach((item, ind) => {
      if (ind !== index) {
        item.classList.remove("active");
      } else item.classList.add("active");
    });
  };

  const useSlider = (arg) => {
    const isDirection = typeof arg === "string";
    const isIndex = typeof arg === "number";

    if (isDirection) {
      if (arg === "next" && currentIndex !== --sliderArr.length) {
        currentIndex = currentIndex + 1;
        doTransitionByIndex(currentIndex);
        addClass(currentIndex);
      } else if (arg === "prev" && currentIndex >= 1) {
        currentIndex = currentIndex - 1;
        doTransitionByIndex(currentIndex);
        addClass(currentIndex);
      }
    }

    if (isIndex) {
      currentIndex = arg;
      doTransitionByIndex(currentIndex);
      addClass(currentIndex);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    sliderArr[0].classList.add("active");

    for (const slide of sliderArr) {
        
    }
    optionList[0].classList.add("active");
  });

  buttonsContainer.addEventListener("click", (event) => {
    const target = event.target;

    const link = target.closest(".slider__direction-btn");

    if (link?.classList.contains("slider__direction-btn--prev")) {
      useSlider("prev");
    } else if (link?.classList.contains("slider__direction-btn--next")) {
      useSlider("next");
    }
  });

  optionContainer.addEventListener("click", (event) => {
    const target = event.target;

    if (target?.classList.contains("slider__controlls-btn")) {
      const itemIndex = optionList.indexOf(target.parentNode);

      useSlider(itemIndex);
    } else if (target?.classList.contains("team__controlls-item")) {
      const itemIndex = optionList.indexOf(target);

      useSlider(itemIndex);
    }
  });
})();
