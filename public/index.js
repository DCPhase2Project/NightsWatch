const $ = window.jQuery
var movieHTML = []

function listenToSearch () {
  document.getElementById('submit-button').addEventListener('click', getMovieFromDB)
}

function getMovieFromDB () {
  const userSearch = document.getElementById('search-bar').value
  $.ajax({
    type: 'POST',
    url: '/send/data',
    data: {
      searchData: userSearch
    }
  })
    .then(function (result) {
      console.log(result)
      movieHTML = result.map(makeMovie).join('')
      if (document.getElementById('resultsContainer').innerHTML === null) {
        $(movieHTML).appendTo('#resultsContainer')
      } else {
        document.getElementById('resultsContainer').innerHTML = null
        $(movieHTML).appendTo('#resultsContainer')
      }
      console.log(movieHTML)
    })
    .catch(function (error) {
      console.log(error)
    })

  function makeMovie (currentMovie) {
    return `<div class="card" style="width: 20rem; background: darkgray; margin: 10px;">
              <div class="card-body d-flex" style="flex-direction: column; align-items: center;">
                <h5 class="card-title d-flex">${currentMovie.title}</h5>
                <h5 class="card-text d-flex" style="margin-bottom: .75rem;">${currentMovie.genre}</h5>
                <a href="#" id="add-button" class="btn btn-primary d-flex" onclick=saveToWatchlist(${currentMovie.id})>Add to your watchlist</a>
              </div>
              </div>`
  }
}

// this button is not there until user submits valid search.  should rely onclick instead of DOMlistener
function saveToWatchlist (id) {
  $.ajax({
    type: 'POST',
    url: '/saveto/watchlist',
    data: {
      searchData: id
    }
  })// ajax
    .then(function (result) {
      console.log(result)
    })
    .catch(function (error) {
      console.log(error)
    })
}

function init () {
  console.log('the search bar is case sensitive')
  listenToSearch()
}

document.addEventListener('DOMContentLoaded', init)
