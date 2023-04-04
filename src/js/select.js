import { sortBy } from "./filter-list.js";

const select = document.querySelector(".select");
const selectList = select.querySelector(".select__list");
const selectPreview = select.querySelector(".select__preview");

function showSelect() {
  select.classList.add("active");
}

function closeSelect() {
  select.classList.remove("active");
}

select.addEventListener("mouseover", showSelect);
select.addEventListener("mouseout", closeSelect);
select.addEventListener("click", showSelect);

selectList.addEventListener("click", (event) => {
  event.preventDefault();

  const target = event.target;

  if (target.classList.contains("select__btn")) {
    const value = target.dataset.select;
    const text = target.textContent;

    selectPreview.textContent = text;

    sortBy(value);
  }
});

export { sortBy };
