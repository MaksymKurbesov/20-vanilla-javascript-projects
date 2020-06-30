const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = []

const getUserData = async () => {
  const res = await fetch(`https://randomuser.me/api`)
  const data = await res.json()
  const user = await data.results[0]

  const newUser = {
    firstName: user.name.first,
    lastName: user.name.last,
    wealth: Math.floor(Math.random() * 1000000)
  }

  addUserToData(newUser)
}

getUserData()
getUserData()
getUserData()

const addUserToData = (user) => {
  data.push(user)

  updateDOM();
}

const doDoubleMoney = () => {
  data = data.map(item => {
    return {
      ...item,
      wealth: item.wealth * 2,
    }
  })

  updateDOM()
}

const showMillionaires = () => {
  data = data.filter(item => item.wealth > 1000000)

  updateDOM()
}

const sortByRichest = () => {
  data = data.sort((a, b) => b.wealth - a.wealth)

  updateDOM()
}

const calculateWealth = () => {
  const totalWealth = data.reduce((prev, current) => {
    return prev = prev + current.wealth
  }, 0)

  const newElement = document.createElement('div')
  newElement.classList.add(`total-wealth`)
  newElement.innerHTML = `<strong>Total wealth</strong> $${formatMoney(totalWealth)}`
  main.append(newElement)
}

const updateDOM = (personsList = data) => {
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`

  personsList.forEach(item => {
    const userFirstLastName = `${item.firstName} ${item.lastName}`
    const newElement = document.createElement(`div`)
    newElement.classList.add(`person`)
    newElement.innerHTML = `<strong>${userFirstLastName}</strong> $${formatMoney(item.wealth)}`
    main.append(newElement)
  })
}

const formatMoney = (moneyValue) => {
  return moneyValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// Event listeners

addUserBtn.addEventListener(`click`, getUserData)
doubleBtn.addEventListener(`click`, doDoubleMoney)
showMillionairesBtn.addEventListener(`click`, showMillionaires)
sortBtn.addEventListener(`click`, sortByRichest)
calculateWealthBtn.addEventListener(`click`, calculateWealth)


function kebabize(str) {
  
}