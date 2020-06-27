const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


const populateUI = () => {
  const selectedSeats =  JSON.parse(localStorage.selectedSeats);
  const selectedMovieIndex = localStorage.selectedMovieIndex;

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add(`selected`)
      }
    })
  }

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

populateUI()

let ticketPrice = movieSelect.value


const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem(`selectedMovieIndex`, movieIndex )
  localStorage.setItem(`selectedMoviePrice`, moviePrice)
}

const updateTotalCounts = () => {
  const selectedSeats = document.querySelectorAll(`.row .seat.selected`)
  const selectedSeatsCount = selectedSeats.length

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat))
  localStorage.setItem(`selectedSeats`, JSON.stringify(seatsIndex))


  count.textContent = selectedSeatsCount
  total.textContent = selectedSeatsCount * ticketPrice
}

movieSelect.addEventListener(`change`, (evt) => {
  ticketPrice = evt.target.value
  setMovieData(evt.target.selectedIndex, evt.target.value)
  updateTotalCounts()
})

container.addEventListener(`click`, (evt) => {
  const isAvailableSeat = evt.target.classList.contains(`seat`) && 
  !evt.target.classList.contains(`occupied`)

  if (isAvailableSeat) {
    evt.target.classList.toggle(`selected`)
  }

  updateTotalCounts()
})

updateTotalCounts()