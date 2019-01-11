function renderMovies (myWatchlist) {
  var movieHTML = myWatchlist.map(makeMovie).join('')
  $(movieHTML).appendTo('#moviesContainer')
}

function makeMovie (currentMovie) {
  return `<div class="card" style="width: 20rem; background: darkgray; margin: 10px;">
          <img class="card-img-top" src="${currentMovie.Poster}">
          <div class="card-body d-flex" style="flex-direction: column; align-items: center;">
            <h5 class="card-title d-flex">${currentMovie.Title}</h5>
            <h5 class="card-text d-flex" style="margin-bottom: .75rem;">${currentMovie.Year}</h5>
            <a href="#" class="btn btn-primary d-flex" onclick=saveToWatchlist('${currentMovie.imdbID}')>Add</a>
          </div>
          </div>`
}

function init () {
  var unparsedWatchlist = localStorage.getItem('watchlist')
  var myWatchlist = JSON.parse(unparsedWatchlist)
  renderMovies(myWatchlist)
}

document.addEventListener('DOMContentLoaded', init)