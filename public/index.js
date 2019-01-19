const $ = window.jQuery
const userSearch = ''
var movieHTML = []
var movieArray = []

document.getElementById('submit-button').addEventListener('click', function () {
  const userSearch = document.getElementById('search-bar').value

  $.ajax({
    type: 'POST',
    url: '/send/data',
    data: {
      searchData: userSearch
    }
  })// ajax
    // .then(function (result) {
    //   console.log(result)
    //   movieArray = result
    //   for (var i = 0; i < result.length; i++) {
    //     var urlEncodedSearchString = encodeURIComponent(movieArray[i].title)
    //     axios.get('http://www.omdbapi.com/?apikey=eefcfdfe&t=' + urlEncodedSearchString).then(getPoster)
    //   }
    // })
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
    .catch(function (error) {
      console.log(error)
    })

  // function getPoster (response) {
  //   var posterArray = response.data.searchData
  //   console.log(posterArray)
  // }

  function makeMovie (currentMovie) {
    return `<div class="card" style="width: 20rem; background: darkgray; margin: 10px;">
              <img class="card-img-top" src="${currentMovie.Poster}">
              <div class="card-body d-flex" style="flex-direction: column; align-items: center;">
                <h5 class="card-title d-flex">${currentMovie.title}</h5>
                <h5 class="card-text d-flex" style="margin-bottom: .75rem;">${currentMovie.genre}</h5>
                <a href="#" id="add-button" class="btn btn-primary d-flex" onclick=saveToWatchlist('${currentMovie.id}')>Put Watchlist functionality here</a>
              </div>
              </div>`
  }
})

// this button is not there until user submits valid search.  should rely onclick instead of DOMlistener
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
