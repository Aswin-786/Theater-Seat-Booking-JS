// accessing 
const container = document.querySelector('.container')
const seat = document.querySelectorAll('.row .seat:not(.booked)')
const movieSelect = document.getElementById('movie')
const count = document.getElementById('seats')
const totalPrice = document.getElementById('price')
// converting to number
let ticketPrice = +movieSelect.value

// update the html page
const updateUI = () => {
  console.log('updated')
  const bookedSeat = JSON.parse(localStorage.getItem('selectedSeats'))
  console.log({ bookedSeat });
  if (bookedSeat !== null && bookedSeat.length > 0) {
    seat.forEach((seat, index) => {
      if (bookedSeat.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }
  const bookedSeatIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'))
  if (bookedSeatIndex != null) {
    movieSelect.selectedIndex = bookedSeatIndex
  }
}

updateUI()

// add movie index and price to localstorage
const setMovieData = (movieIndex, moviePrice) => {
  console.log(movieIndex, moviePrice);
  localStorage.setItem('selectedMovieIndex', JSON.stringify(movieIndex))
  localStorage.setItem('selectedMoviePrice', JSON.stringify(moviePrice))
}

// updating the DOM
const updateSelection = () => {
  const selcectSeat = document.querySelectorAll('.row .seat.selected')
  const seatIndex = [...selcectSeat].map(function (obj) {
    return [...seat].indexOf(obj)
  })
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))
  console.log(seatIndex);
  const seatTotal = selcectSeat.length
  count.innerText = seatTotal
  totalPrice.innerText = seatTotal * ticketPrice
  console.log(seatTotal);
}

// selecting the movies
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelection()
})

// selecting the seats
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && (!e.target.classList.contains('booked'))) {
    e.target.classList.toggle('selected')
  }
  updateSelection()
})

updateSelection()
