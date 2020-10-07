const app = document.getElementById('root'); // We target the div in the index.html
const logo = document.createElement('img'); // We create the logo for the index.html
logo.src = 'images/logo.png';
const container = document.createElement('div') // We create a container
container.setAttribute('class', 'container') // We give the container the class 'container'
app.appendChild(logo); // We append the logo to the root div
app.appendChild(container); //We append the container to the root div

// Create a request variable and assign a new XMLHttpRequest object to it.
//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
// In the arguments we'll specify the type of request as GET as well as the URL of the API endpoint
// The true argument means that the request is handleded asynchronously
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

//The request completes and we can access the data inside the onload function. When we're done, we'll send the request
request.onload = function () {
    // Begin accessing JSON data here
    // We need to convert that JSON in to JavaScript objects in order to work with it, so we use parse on the JSON object
    const theMovies = JSON.parse(this.response); // This contains all the JSON as an array of JavaScript objects
    //console.log(theMovies); - this is a test


    if (request.status >= 200 && request.status < 400) {
        theMovies.forEach(elephant => {

            // We create a div with the 'card' class
            const displayCard = document.createElement('div');
            displayCard.setAttribute('class', 'card');

            // We create an h1 and set the h1's content to the film's title
            const movieTitle = document.createElement('h1');
            movieTitle.textContent = elephant.title;

            // We create a p element and set the text to the movie's description
            const movieDescription = document.createElement('p');
            elephant.description = elephant.description.substring(0, 300); //we use substring() to keep all descriptions the same lenght so all cards have the same dimensions
            movieDescription.textContent = `${elephant.description}...`;

            // We append the card to the container
            container.appendChild(displayCard);

            // We append the title and the content to the card
            displayCard.appendChild(movieTitle);
            displayCard.appendChild(movieDescription);

        });
    } else {
        setTimeout(() => { window.location.href = '/error404.html'; }, 4000); // In case of an error we redirect the user to a 404 page

    }
}

// Send request
request.send()
