const mobileFilterContainer = document.querySelector(".filter-mobile");
const filterButton = document.querySelector(".product-filter-label");
const body = document.querySelector("body");

const wrapper = document.querySelector(".wrapper");

const check = (event) => {
  const target = event.target;
  if (
    !target.classList.contains("filter-mobile") &&
    !target.closest(".filter-mobile")
  ) {
    closeMobileFilter();
  }
};

const openMobileFilter = () => {
  mobileFilterContainer.classList.add("active");
  wrapper.classList.add("active");
  wrapper.style.pointerEvents = "auto";

  if (mobileFilterContainer.classList.contains("active")) {
    setTimeout(() => body.addEventListener("click", check), 0);
  }
};

const closeMobileFilter = () => {
  mobileFilterContainer.classList.remove("active");
  wrapper.classList.remove("active");

  if (!mobileFilterContainer.classList.contains("active")) {
    setTimeout(() => body.removeEventListener("click", check), 0);
  }
};

filterButton.addEventListener("click", openMobileFilter);
