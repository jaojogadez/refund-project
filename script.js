/* FORM's ELEMENTS */
const $form = document.querySelector("form");
const $amount = document.querySelector("#amount");
const $expense = document.querySelector("#expense");
const $category = document.querySelector("#category");

/* LIST's ELEMENTS */
const $ul = document.querySelector("ul");
console.log($ul);
$amount.oninput = () => {
  let value = $amount.value.replace(/\D/g, "");
  value = Number(value / 100);
  $amount.value = formatCurrencyBRL(value);
};

let formatCurrencyBRL = (value) => {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
};

$form.onsubmit = (event) => {
  event.preventDefault();
  const newExpense = {
    id: new Date().getTime(),
    expense: $expense.value.trim(),
    category_id: $category.value,
    category_name: $category.options[$category.selectedIndex].text,
    amount: $amount.value,
    created_at: new Date(),
  };

  expenseAdd(newExpense);
};


let expenseAdd = (newExpense) => {
  try {
    // create li
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // create img
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // create expense info
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // create exepense name
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // create expense category
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // add to div
    expenseInfo.append(expenseName, expenseCategory)

    // create expense amount
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `
    <small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}
    `

    // create remove icon
    const removeIconExpense = document.createElement("img")
    removeIconExpense.classList.add("remove-icon")
    removeIconExpense.setAttribute("src", "./img/remove.svg")
    removeIconExpense.setAttribute("alt", "remover")

    // add to list
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIconExpense);
    $ul.append(expenseItem);

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
};

/*
let expenseAdd2 = (newExpense) => {
  try {
    // create new expenseList
    const newExpenselist = `
      <li class="expense">
        <img src="img/${newExpense.category_id}.svg" alt="Ícone de tipo da despesa" />

        <div class="expense-info">
          <strong>${newExpense.expense}</strong>
          <span>${newExpense.category_name}</span>
        </div>

        <span class="expense-amount"><small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}</span>

        <img src="./img/remove.svg" alt="remover" class="remove-icon" />
      </li>
    `;

    $ul.insertAdjacentHTML("afterbegin", newExpenselist)
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
};
*/

