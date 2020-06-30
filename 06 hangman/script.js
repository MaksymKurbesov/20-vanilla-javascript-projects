const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['peace', 'love', 'world'];

const correctLetters = [],
      wrongLetters = [];

let selectedWord = words[Math.floor(Math.random() * words.length)]

const displayWord = () => {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => {
        return `<span class="letter">${correctLetters.includes(letter) ? letter : ``}</span>`
      })
      .join(``)
    }
  `
  if (wordEl.textContent.trim() === selectedWord) {
    finalMessage.innerText = `Congratulations`
    popup.style.display = `flex`    
  }
}

const showNotification = () => {
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000);
}

const updateWrongLettersEl = () => {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ``}
    ${wrongLetters.map(letter => `<span> ${letter}</span>`)}
  `
  
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length

    if (index < errors) {
      part.style.display = `block`
    } else {
      part.style.display = `none`
    }
  })

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `U DIED :'(`
    popup.style.display = 'flex'
  }
}

window.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode >= 65 && evt.keyCode <= 90) {

    const letter = evt.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord();
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)
        updateWrongLettersEl()
      } else {
        showNotification()
      }
    }
  }
})

playAgainBtn.addEventListener(`click`, () => {
  correctLetters.length = 0
  wrongLetters.length = 0

  selectedWord = words[Math.floor(Math.random() * words.length)]

  displayWord()

  updateWrongLettersEl()

  popup.style.display = `none`
})

displayWord();

