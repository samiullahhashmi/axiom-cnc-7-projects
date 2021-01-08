

// Array of deck of card images
const deckCards = [
    "car-1.png",
    "car-1.png",
    "car-2.png",
    "car-2.png",
    "car-3.png",
    "car-3.png",
    "car-4.png",
    "car-4.png",
    "car-5.png",
    "car-5.png",
    "car-6.png",
    "car-6.png",
    "car-7.png",
    "car-7.png",
    "car-8.png",
    "car-8.png",
    "car-9.png",
    "car-9.png",
    "car-10.png",
    "car-10.png"
];

// GLOBAL Arrays
// Access the <ul> with class  of .deck
const deck = document.querySelector(".deck");

// Create an empty array to store the opened cards
let opened = [];

// Create an empty array to store the matched cards
let matched = [];

// Access the modal
const modal = document.getElementById("modal");

// Access the reset button
const reset = document.querySelector(".reset-btn");

// Access the play again button
const playAgain = document.querySelector(".play-again-btn");

// Select the class moves-counter and change it's HTML
const movesCount = document.querySelector(".moves-counter");

// Create variable for moves counter, start the count at zero
let moves = 0;
const star = document.getElementById("star-rating").querySelectorAll(".star");
let starCount = 5;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

// FUNCTIONS
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {
    const shuffledDeck = shuffle(deckCards);
    for (let i = 0; i < shuffledDeck.length; i++) {
        const liTag = document.createElement('LI');
        liTag.classList.add('card');
        const addImage = document.createElement('IMG');
        liTag.appendChild(addImage);
        addImage.setAttribute("src", "Images/" + shuffledDeck[i]);
        deck.appendChild(liTag);
    }
}
startGame();

function removeCard() {
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
}

function timer() {
    time = setInterval(function() {
        seconds++;

        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timeCounter.innerHTML = "<i class='fas fa-hourglass-start'></i>" + "Timer: " + minutes + " Mins " + seconds + " Secs";
    }, 1000);
}

function stopTime() {
    clearInterval(time);
}

function resetEverything() {
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = "<i class='fas fa-hourglass-start'></i>" + "Timer: 00:00";

    star[1].firstElementChild.classList.add("fa-star");
    star[2].firstElementChild.classList.add("fa-star");
    starCount = 5;
    moves = 0;
    movesCount.innerHTML = 0;
    matched = [];
    opened = [];
    removeCard();
    startGame();
}

function movesCounter() {
    movesCount.innerHTML ++;
    moves ++;
}

function starRating() {
    if (moves === 14) {
        star[2].firstElementChild.classList.remove("fa-star");
        starCount--;
    } 

    if (moves === 18) {
        star[1].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
}

function compareTwo() {
    if (opened.length === 2) {
        document.body.style.pointerEvents = "none";
    }

    if (opened.length === 2 && opened[0].src === opened[1].src) {

        match();

    } else if (opened.length === 2 && opened[0].src != opened[1].src) {
        noMatch();
    }
}

function match() {
    setTimeout(function() {
        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");
        matched.push(...opened);
        document.body.style.pointerEvents = "auto";
        winGame();
        opened = [];
    }, 600);
    movesCounter();
    starRating();
}

function noMatch() {
    setTimeout(function() {
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        opened = [];
    }, 700);
    
    movesCounter ();
    starRating();
}

function addStats() {
    const stats = document.querySelector(".modal-content");
    for (let i = 1; i <= 3; i++) {
        const statsElement = document.createElement("p");
        statsElement.classList.add("stats");
        stats.appendChild(statsElement);
    }

    let p = stats.querySelectorAll("p.stats");
    p[0].innerHTML = "Time to complete: " + minutes + " Minutes and " + seconds + " Seconds";
    p[1].innerHTML = "Moves Taken: " + moves;
    p[2].innerHTML = "Your Star Rating is: " + starCount + " out of 5";
}

function displayModal() {
    const modalClose = document.getElementById("close");
    modal.style.display = "block";
    modalClose.onClick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function winGame() {
    if (matched.length ===20) {
        stopTime();
        addStats();
        displayModal();
    }
}

deck.addEventListener('click', function(evt) {
    if (evt.target.nodeName === "LI") {
        console.log(evt.target.nodeName + " Was clicked");
        if (timeStart === false) {
            timeStart = true;
            timer();
        }
        flipCard();
    }

    function flipCard() {
        evt.target.classList.add("flip");
        addToOpened();
    }

    function addToOpened() {
        if (opened.length === 0 || opened.length === 1) {
            opened.push(evt.target.firstElementChild);
        }
        compareTwo();
    }
});

reset.addEventListener("click", resetEverything);
playAgain.addEventListener("click", function() {
    modal.style.display = "none";
    resetEverything();
});