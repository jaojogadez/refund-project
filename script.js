/* FORM's ELEMENTS */
const $amount = document.querySelector("#amount");

$amount.oninput = () => {
  let value = $amount.value.replace(/\D/g, "");
  value = Number(value) / 100
  $amount.value = formatCurrencyBRL(value);
};

let formatCurrencyBRL = (value) => {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
  return value
};
