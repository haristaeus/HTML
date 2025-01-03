var blurval = 20;

function fillGuess(a) { 
    document.getElementById("guess-search").value = a.innerText; 
}

function filterList() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("guess-search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("movie-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

function changeBlur(d) {
    var blurvalp = document.getElementById("blurval")
    blurval += d;
    blurvalp.innerText = 'Blur Value: ' + blurval;
    drawCanvas();
}

function drawCanvas() {
    var c = document.getElementById("answer-canvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("answer-image");
    ctx.clearRect(0, 0, c.width, c.height);
    c.style.filter = "blur(" + blurval + "px)";
    ctx.drawImage(img, 0, 0, c.width, c.height);
    APICALL();
}

function checkAnswer() {

}

function APICALL() {
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGI1OWIyMDgxZGUxZTg1N2NmYTQ1MmM3MTRhMDZhNCIsIm5iZiI6MTczNTgxMDk5Ny4xMTMsInN1YiI6IjY3NzY1ZmI1MGYyNDhlODUwODEyZWUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E7AFG6BZ7lLOI-pIuUuNmavRbYPMcFwURo68GX4gfRE'
  }
  };

  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
}

window.onload = drawCanvas;