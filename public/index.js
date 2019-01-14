var movieHTML = []
var moviesArray = []
const express = require('express')
const queries = require('../public/query')

// const app = express()

// app.get('/db/movie/:title', handleMovieTitleRoute)

// function handleMovieTitleRoute (req, res, nextFn) {
//   const title = req.params.title

//   queries.db.users.findOne(title)
//     .then(function(result) {
//       res.json(result)
//     })
//     .catch(function() {
//       res.status(404)
//     })
// }

function listenToSearch () {
  document.getElementById('search-form').addEventListener('submit', hitMoviesDB)
}

function hitMoviesDB (e) {
  e.preventDefault()
  var searchString = document.getElementById('search-bar').value
  var urlEncodedSearchString = encodeURIComponent(searchString)
  console.log('hitting the movies API')
  axios.get('https://www.omdbapi.com/?apikey=3430a78&s=' + urlEncodedSearchString).then(userChoice)
}

function userChoice (response) {
  moviesArray = response.data.Search
  movieHTML = response.data.Search.map(makeMovie).join('')
  if (document.getElementById('resultsContainer').innerHTML === null) {
    $(movieHTML).appendTo('#resultsContainer')
    console.log(document.getElementById('resultsContainer').innerHTML)
  } else {
    document.getElementById('resultsContainer').innerHTML = null
    $(movieHTML).appendTo('#resultsContainer')
    console.log(document.getElementById('resultsContainer').innerHTML)
    console.log("Sorry, we don't currently have that movie in stock.")
  }
}

function makeMovie (currentMovie) {
  return `<div class="card" style="width: 20rem; background: darkgray; margin: 10px;">
          <img class="card-img-top" src="${currentMovie.Poster}">
          <div class="card-body d-flex" style="flex-direction: column; align-items: center;">
            <h5 class="card-title d-flex">${currentMovie.Title}</h5>
            <h5 class="card-text d-flex" style="margin-bottom: .75rem;">${currentMovie.Year}</h5>
            <a href="#" class="btn btn-primary d-flex" onclick=saveToWatchlist('${currentMovie.imdbID}')>Add!</a>
          </div>
          </div>`
}

function saveToWatchlist (imdbID) {
  console.log(imdbID)
  var movie = moviesArray.find(function (currentMovie) {
    return currentMovie.imdbID === imdbID
  })
  var watchlistJSON = localStorage.getItem('watchlist')
  var watchlist = JSON.parse(watchlistJSON)
  if (watchlist === null) {
    watchlist = []
    watchlist.push(movie)
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)
  } else {
    watchlist.push(movie)
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)
  }
}

function init () {
  listenToSearch()
}

document.addEventListener('DOMContentLoaded', init)