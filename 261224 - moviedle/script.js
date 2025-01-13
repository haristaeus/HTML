var blurval = 30;
var guesses = 6;
let movieMatrix = {};
let randomPosterId = '';

const input = document.getElementById("guess-search");

const apiKey = '20b59b2081de1e857cfa452c714a06a4';
const moviesContainer = document.getElementById("movies-list");


async function fetchMovies() {
  try {
    for (let i=1; i<=20; i++) {  
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${i}&api_key=${apiKey}&language=en-US&sort_by=popularity.desc&vote_count.gte=560&with_original_language=en`);
      const data = await response.json();
    
      data.results.forEach(media => {
      movieMatrix[media.poster_path] = media.title;
      const movieCard = createMovieCard(media);
      moviesContainer.appendChild(movieCard);
      });
    }  
    
    const posterIds = Object.keys(movieMatrix);
    randomPosterId = posterIds[Math.floor(Math.random() * posterIds.length)];
    drawCanvas(randomPosterId);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createMovieCard(media) {
  const { title, poster_path } = media;

  const movieCard = document.createElement("li");
  movieCard.innerHTML = `<a onclick="fillGuess(this)">${title}</a>`;
  return movieCard;
}

function fillGuess(a) { 
    document.getElementById("guess-search").value = a.innerText; 
}

function filterList() {
    var filter, li, a, i;
    filter = input.value.toUpperCase();
    li = moviesContainer.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  function checkAnswer() {
    const answer = movieMatrix[randomPosterId];
    const guessDisp = document.getElementById("guess-display");
    const userGuess = input.value.trim();
    const resultDisp = document.getElementById("result-display");
    const guessBtn = document.getElementById("guess-button");

    if (userGuess === "") {
      alert("Please enter a guess!");
      return;
    }

    if (userGuess.toLowerCase() === answer.toLowerCase()) {
      input.disabled = true;
      resultDisp.innerText = 'Correct! Click to play again.';
      changeBlur(0);
      guessBtn.onclick = function() {reloadGame()};
      guessBtn.innerText = "Reload";
    } else {
      guesses--;
      input.value = "";
      filterList();
      changeBlur(guesses);
      if (guesses <= 0) {
        resultDisp.innerText = 'Incorrect! Click to play again.';
        guessBtn.onclick = function() {reloadGame()};
        guessBtn.innerText = "Reload";
      }
    }
  }

  function changeBlur(d) {
    blurval = d * 5;
    console.log("changeblur");
    drawCanvas(randomPosterId);
  }
  
  function drawCanvas(randomPosterId) {
    var c = document.getElementById("answer-canvas");
    var ctx = c.getContext("2d");
    var img = new Image();

    img.src = `https://image.tmdb.org/t/p/w500/${randomPosterId}`;

    img.onload = function() {
      c.width = img.width;
      c.height = img.height;

      ctx.clearRect(0, 0, c.width, c.height);
      ctx.filter = `blur(${blurval}px)`;
      ctx.drawImage(img, 0, 0, c.width, c.height);
    };
    img.onerror = function() {
      console.error("Failed to load the image.");
    };
}  

function reloadGame() {
  console.log("reload");
  location.reload();
  return false;
}
  
window.onload = fetchMovies;


//        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img_rounded">
