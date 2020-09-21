const Container = document.querySelector('.Container');
const seats = document.querySelectorAll('.my-row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let movieInfo = movieSelect.value;
movieInfo = movieInfo.split('|');
let ticketPrice = +movieInfo[0];
document.getElementById('moviePoster').src = './images/'+movieInfo[1];

populateUI();


// onClick availabe seats
Container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
});
 

// updating the counts

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.my-row .seat.selected');
    const countSelectedSeats = selectedSeats.length;
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    count.innerText = countSelectedSeats;
    total.innerText = ticketPrice * countSelectedSeats;
}


// saving the movie and the price
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}


// data from local storage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach( (seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

// movie drop down
movieSelect.addEventListener('change', e => {
    var info = e.target.value.split('|');
    console.log(info[1]);
    document.getElementById('moviePoster').src = './images/'+info[1];
    ticketPrice = +info[0];
     
    setMovieData(e.target.selectedIndex, +info[0]);
    updateSelectedCount();
})

// seats and price
updateSelectedCount();