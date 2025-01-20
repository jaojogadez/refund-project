/* FORM's ELEMENTS */
const $form = document.querySelector("form");
const $amount = document.querySelector("#amount");
const $expense = document.querySelector("#expense");
const $category = document.querySelector("#category");

/* LIST's ELEMENTS */
const $ul = document.querySelector("ul");
const exepensesTotal = document.querySelector("aside header h2");
const $expensesQuantity = document.querySelector("aside header p span");

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
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // create exepense name
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // create expense category
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // add to div
    expenseInfo.append(expenseName, expenseCategory);

    // create expense amount
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `
    <small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}
    `;

    // create remove icon
    const removeIconExpense = document.createElement("img");
    removeIconExpense.classList.add("remove-icon");
    removeIconExpense.setAttribute("src", "./img/remove.svg");
    removeIconExpense.setAttribute("alt", "remover");

    // create edit icon
    const editIconExpense = document.createElement("i");
    editIconExpense.classList.add("bi", "bi-pencil-square");

    // add to list
    expenseItem.append(
      expenseIcon,
      expenseInfo,
      expenseAmount,
      editIconExpense,
      removeIconExpense
    );
    $ul.append(expenseItem);
    $form.reset();

    updateTotals();
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

let updateTotals = () => {
  try {
    const items = $ul.children;
    $expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    let total = 0;
    for (let index = 0; index < items.length; index++) {
      const indexAmount = items[index].querySelector(".expense-amount");
      let value = indexAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");
      value = Number.parseFloat(value);

      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o valor total. O valor não parece ser um número."
        );
      } else {
        total += Number(value);
      }
    }

    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    exepensesTotal.innerHTML = "";
    exepensesTotal.append(symbolBRL, total);
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
};

$ul.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-icon")) {
    const item = event.target.closest(".expense");
    item.remove();
  }
  updateTotals();
});

$ul.addEventListener("click", (event) => {
  if (event.target.classList.contains("bi-pencil-square")) {
    const item = event.target.closest(".expense");
    const itemExpense = item.querySelector(".expense-info strong").textContent.trim();
    const itemCategory = item.querySelector(".expense-info span").textContent.trim();
    const itemAmount = item.querySelector(".expense-amount").textContent.trim();

    $expense.value = itemExpense;
    $amount.value = itemAmount;

    const options = document.querySelectorAll("option");
    options.forEach((option) => {
      if (option.textContent == itemCategory) {
        option.selected = true;
      }
    });

    item.remove();
  }
  updateTotals();
});
