const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');


const searchMeal = (evt) => {
  evt.preventDefault()

  let term = search.value

  mealsEl.innerHTML = ``

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        resultHeading.innerHTML = `<h2>Search result for '${term}':</h2>`

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`
        } else {
          mealsEl.innerHTML = data.meals.map(meal => {
            return (
              `<div class="meal">
                <img src="${meal.strMealThumb}" alt=""/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>"${meal.strMeal}"</h3>
                </div>
              </div>`)
          }).join('')
        }
      })
      term = ``
  } else {
    console.log('Please enter some meal')
  }

}

const addMealToDOM = (meal) => {
  const ingredients = []

  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>
`
}

const getMealsById = (mealID) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0]

      addMealToDOM(meal)
    })
}

const getRandomMeal = () => {
  mealsEl.innerHTML = ``
  resultHeading.innerHTML = ``
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => addMealToDOM(data.meals[0]))
}

mealsEl.addEventListener(`click`, (evt) => {
  const mealInfo = evt.path.find(item => item.classList ? item.classList.contains(`meal-info`) : false)
  const mealID = mealInfo.getAttribute(`data-mealid`)

  getMealsById(mealID)
})
random.addEventListener(`click`, getRandomMeal)
submit.addEventListener(`submit`, searchMeal)




