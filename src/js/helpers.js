export function generateCorrectLabel(value) {
  let str = "";
  let counter = Number(value.toString().at(-1));

  if (counter === 1) {
    str = "товар";
  }

  if (counter >= 2 && counter <= 4) {
    str = "товара";
  }

  if ((counter >= 5 && counter <= 9) || counter === 0) {
    str = "товаров";
  }

  return str;
}
