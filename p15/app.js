// Get DOM elements
// Get the search form
const form = document.getElementById('form');

// Get the input text field
const search = document.getElementById('search');

// Get the results
const results = document.getElementById('results');

// Get the pagination container
const pagination = document.getElementById('pagination');


// API base url
const api = 'https://api.lyrics.ovh';


// Functions
 // 1: To search song title and artist
 async function searchSongs(term) {
    const res = await fetch(`${api}/suggest/${term}`);
    const data = await res.json();

    showData(data);
 }

 // 2: To display data from search in the DOM
 function showData(data) {
     // Display the first set of songs in the DOM
    results.innerHTML = `
        <ul class="songs">
            ${data.data.map(
                    song => `
                        <li>
                            <span>${song.artist.name} - ${song.title}</span>
                            <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">Get Lyrics</button>
                        </li>
                    `
                ).join('')
            }
        </ul>
    `;

    // Add pagination if required
    if ( data.prev || data.next ) {
        pagination.innerHTML = `
            ${ data.prev ? `<button class="btn pag-btn" onClick="getNewSongs('${data.prev}')"><i class="fas fa-arrow-left"></i>  Prev</button>` : '' }
            ${ data.next ? `<button class="btn pag-btn" onClick="getNewSongs('${data.next}')"><i class="fas fa-arrow-right"></i>  Next</button>` : '' }
        `;
    } else {
        pagination.innerHTML = '';
    }
 }


 // 3: To get the previous or next songs
 async function getNewSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
 }


 // 4: To get the lyrics of a song
 async function getLyrics(artist, title) {
    const res = await fetch(`${api}/v1/${artist}/${title}`);
    const data = await res.json();

    const lyrics = data.lyrics;

    results.innerHTML = `
        <h2 class="centered">${artist} - ${title}</h2>
        <span class="lyrics-info centered">${lyrics}</span>    
    `;

    pagination.innerHTML = '';
 }




// Event Listeners
 // 1: For search form
 form.addEventListener('submit', e => {
    // Prevent the reload page on submit
    e.preventDefault();
    // get the search term as a variable
    const searchTerm = search.value.trim();
    // Ckech if search term is valid
    if (searchTerm) {
        searchSongs(searchTerm);
    } else {
        alert('Please enter a valid search')
    }
})


 // 2: To get lyrics 
 results.addEventListener('click', e => {
     // find out what was clicked
     const clickedElement = e.target;
     // check if clicked element is a button
     if ( clickedElement.tagName == 'BUTTON' ) {
         const artist = clickedElement.getAttribute('data-artist');
         const title  = clickedElement.getAttribute('data-title');
         // fetch the lyrics
         getLyrics(artist, title);
     }

 })