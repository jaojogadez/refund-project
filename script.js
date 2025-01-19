/* FORM's ELEMENTS */
const $form = document.querySelector("form")
const $amount = document.querySelector("#amount");
const $expense = document.querySelector("#expense");
const $category = document.querySelector("#category");

$amount.oninput = () => {
  let value = $amount.value.replace(/\D/g, "");
  value = Number(value / 100);
  $amount.value = formatCurrencyBRL(value);
};

let formatCurrencyBRL = (value) => {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return value;
};

$form.onsubmit = (event) => {
  event.preventDefault()
  const newExpense = {
    id: new Date().getTime(),
    expense: $expense.value.trim(),
    catedory_id: $category.value,
    catedory_name: $category.options[$category.selectedIndex].text,
    amount: $amount.value,
    created_at: new Date(),
  }
  console.log(newExpense)
  expenseAdd()
}

let expenseAdd = (newExpense) => {
  try {
    throw new Error("Erro de Teste")
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}