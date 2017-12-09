

const app   = document.getElementById('root');
const logo  = document.createElement('img');
logo.src    = 'logo.png';
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo); // Adds logo to app root
app.appendChild(container); //A Adds container div to app root

var request = new XMLHttpRequest();
$base_url = "https://ghibliapi.herokuapp.com";

request.open('GET', $base_url+'/films', true);

request.onload = function() {
  // THis is where we will process JSON responses
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      // Create a div with a card class
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      // Create an h1 and set the text content to the film's title
      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      // Create a p and set the text content to the film's description
      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300); // Limit to 300 chars
      p.textContent = `${movie.description}...`; // End with an ellipses

      const a = document.createElement('a');
      a.setAttribute('href', $base_url+'/films/'+movie.id);

      // Append the cards to the container element
      container.appendChild(card);

      // Each card will contain an h1 and a p
      card.appendChild(a);
      a.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
    console.log("Error connecting to API");
  }
}

request.send();