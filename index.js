const state = {
  transactions: [],
};

const netAmountEl = document.getElementById("netAmount");
const earningEl = document.getElementById("earning");
const expenseEl = document.getElementById("expense");
const totalBalanceEl = document.getElementById("totalBalance");
const transactionContainerEl = document.querySelector(".transactions");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

const renderTransactions = () => {
  const transactions = state.transactions;

  let earning = 0;
  let expense = 0;

  transactionContainerEl.innerHTML = "";

  transactions.forEach((transaction) => {
    const { id, amount, text, type } = transaction;
    const isCredit = type === "credit";
    const sign = isCredit ? "+" : "-";

    const transactionEl = document.createElement("div");
    transactionEl.classList.add("transaction");
    transactionEl.id = id;

    const leftContainer = document.createElement("div");
    leftContainer.classList.add("left");

    const textParagraph = document.createElement("p");
    textParagraph.textContent = text;

    const amountParagraph = document.createElement("p");
    amountParagraph.textContent = `${sign} ₹${amount}`;

    leftContainer.appendChild(textParagraph);
    leftContainer.appendChild(amountParagraph);

    transactionEl.appendChild(leftContainer);

    const statusDiv = document.createElement("div");
    statusDiv.classList.add("status", isCredit ? "credit" : "debit");
    statusDiv.textContent = isCredit ? "C" : "D";

    transactionEl.appendChild(statusDiv);

    transactionContainerEl.appendChild(transactionEl);

    if (isCredit) {
      earning += amount;
    } else {
      expense += amount;
    }
  });

  const net = earning - expense;
  const totalBalance = state.transactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

  state.net = net;

  netAmountEl.textContent = `₹${net}`;
  earningEl.textContent = `₹${earning}`;
  expenseEl.textContent = `₹${expense}`;
  totalBalanceEl.textContent = `₹${totalBalance}`;
};

const addTransaction = (text, amount, type) => {
  const transaction = {
    id: Math.floor(Math.random() * 1000),
    text: text,
    amount: +amount,
    type: type,
  };

  state.transactions.push(transaction);

  renderTransactions();
};

const earnBtn = document.getElementById("earnBtn");
const expBtn = document.getElementById("expBtn");

earnBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  const amount = amountInput.value.trim();

  if (text && amount) {
    addTransaction(text, amount, "credit");
    textInput.value = "";
    amountInput.value = "";
  }
});

expBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  const amount = amountInput.value.trim();

  if (text && amount) {
    addTransaction(text, amount, "debit");
    textInput.value = "";
    amountInput.value = "";
  }
});

// Render transactions initially
renderTransactions();