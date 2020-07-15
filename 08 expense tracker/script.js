const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let dummyTransactions = [
  {id: 1, text: `flower`, amount: -200},
  {id: 2, text: `salary`, amount: +500},
  {id: 3, text: `food`, amount: -300},
  {id: 4, text: `dolgEpta`, amount: +500},
]

const addTransactionToDOM = (transactions) => {
  list.innerHTML = `${transactions.map(transaction => {
    const sign = transaction.amount < 0 ? `minus` : `plus`
    return `
      <li class=${sign}>
        ${transaction.text} <span>${sign === `minus` ? `-` : `+`}$${Math.abs(transaction.amount)}.00</span><button onclick="deleteTransactionFromData(${transaction.id})" class="delete-btn"}}">x</button>
      </li>`
  }).join('')}`
}

const calculateBalance = (transactions) => {
  const total = transactions.reduce((acc, prev) => {
    return acc += prev.amount
  }, 0)
  const expense = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, prev) => {
      return acc += prev.amount
    }, 0)
  const income = transactions 
  .filter(transaction => transaction.amount > 0)
  .reduce((acc, prev) => {
    return acc += prev.amount
  }, 0)

  balance.innerHTML = `$${total}.00`
  money_minus.innerHTML = `-$${Math.abs(expense)}.00`
  money_plus.innerHTML = `+$${Math.abs(income)}.00`
}

const generateID = () => {
  return Math.floor(Math.random() * 1000000)
}

const addTransactionToData = (evt) => {
  evt.preventDefault()

  const newTransaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  }

  dummyTransactions.push(newTransaction)
  text.value = ``
  amount.value = ``
  updateDOM()
}

const deleteTransactionFromData = (id) => {
  dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== id)
  console.log(dummyTransactions)
  updateDOM()
}

const updateDOM = () => {
  calculateBalance(dummyTransactions)
  addTransactionToDOM(dummyTransactions)
}

updateDOM()
form.addEventListener(`submit`, addTransactionToData)