const $ = window.jQuery
const userID = 2

function renderWatchlist () {
  $.ajax({
    type: 'POST',
    url: '/watchlist',
    data: {
      searchData: userID
    }
  })
    .then(function (result) {
      let movieArray = result[0].movies
      let movieHTML = movieArray.map(makeMovie).join('')
      if (document.getElementById('moviesContainer').innerHTML === null) {
        $(movieHTML).appendTo('#moviesContainer')
      } else {
        document.getElementById('moviesContainer').innerHTML = null
        $(movieHTML).appendTo('#moviesContainer')
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

function removeFromWatchlist (id) {
  $.ajax({
    type: 'DELETE',
    url: '/removefrom/watchlist',
    data: {
      movieId: id,
      userId: userID
    }
  })
    .then(renderWatchlist())
    .catch(function (error) {
      console.log(error)
    })
}

function makeMovie (currentMovie) {
  return `<div class="card" style="width: 20rem; background: darkgray; margin: 10px;">
            <div class="card-body d-flex" style="flex-direction: column; align-items: center;">
              <h5 class="card-title d-flex">${currentMovie.title}</h5>
              <h5 class="card-text d-flex" style="margin-bottom: .75rem;">${currentMovie.genre}</h5>
              <a href="#" id="add-button" class="btn btn-primary d-flex" onclick=removeFromWatchlist(${currentMovie.id})>Remove your watchlist</a>
            </div>
            </div>`
}

function init () {
  console.log('the DOM is listening')
  renderWatchlist()
}

document.addEventListener('DOMContentLoaded', init)
