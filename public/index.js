const $ = window.jQuery
const userSearch = ''
var movieHTML = []

document.getElementById('submit-button').addEventListener('click', function () {
  const userSearch = document.getElementById('search-bar').value

  $.ajax({
    type: 'POST',
    url: '/send/data',
    data: {
      searchData: userSearch
    }
  })// ajax
    .then(function (result) {
      console.log(result)
      movieHTML = result.map(makeMovie).join('')
      if (document.getElementById('resultsContainer').innerHTML === null) {
        $(movieHTML).appendTo('#resultsContainer')
      } else {
        document.getElementById('resultsContainer').innerHTML = null
        $(movieHTML).appendTo('#resultsContainer')
      }
    })
    // .then(function (result) {
    //   console.log(result)
    //   var searchString = userSearch
    //   var urlEncodedSearchString = encodeURIComponent(searchString)
    //   axios.get('https://www.omdbapi.com/?apikey=3430a78&s=' + urlEncodedSearchString)
    // })
    .catch(function (error) {
      console.log(error)
    })

  function makeMovie (currentMovie) {
    return `<div class="card" style="width: 20rem; background: darkgray; margin: 10px;">
              <img class="card-img-top" src="${currentMovie.Poster}">
              <div class="card-body d-flex" style="flex-direction: column; align-items: center;">
                <h5 class="card-title d-flex">${currentMovie.title}</h5>
                <h5 class="card-text d-flex" style="margin-bottom: .75rem;">${currentMovie.genre}</h5>
                <a href="#" class="btn btn-primary d-flex" onclick=saveToWatchlist('${currentMovie.id}')>Put Watchlist functionality here</a>
              </div>
              </div>`
  }
})

document.getElementById('add-button').addEventListener('click', function () {
  $.ajax({
    type: 'POST',
    url: '/saveto/watchlist',
    data: {
      searchData: userSearch
    }
  })// ajax
    .then(function (result) {
      console.log(result)
    })
    .catch(function (error) {
      console.log(error)
    })
})

function init () {
  console.log('the search bar is case sensitive')
}

document.addEventListener('DOMContentLoaded', init)
