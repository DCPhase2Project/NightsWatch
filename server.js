var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var db = require('./models/db')
const Sequelize = require('sequelize')
const queries = {}
const Op = Sequelize.Op

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

//why did a 'get' not work here???
app.post('/send/data', function(request, response, nextFn) {
    let movieSearch = request.body.searchData
    console.log(movieSearch)

    //queries
    db.movies.findAll({
        where: {
          title: {
            [Op.like]: '%' + movieSearch + '%'
          }
        }
      })
        .then(function (results) {
            const data = results.map(function (result) {
                return result.dataValues
            })
            response.send(data)
  
        }) 

    
})//post function

app.post('/saveto/watchlist', function(request, respone, nextFn) {
  let movieSearch = request.body.searchData
  console.log(movieSearch)
  //how do we get the user's id?

  //how do we get the movie id?

  const movieID = 5
  const userID = 2

  //users presses add button on html card and it renders to users database
  db.movie_users.create({
      user_id: userID,
      movie_id: movieID
  })
    .then(function (result) {
      console.log(result)
    })
    .catch (function (error) {
      console.log(error)
    })
})

app.post('/watchlist/:movieID', function (request, response, nextFn) {
  const userID = 7

  //

  db.movie_users.create({
    user_id: userID,
    movie_id: request.params.movieID
  })
  .then(function (result) {
    response.send(result)
  })
  .catch(function (error) {
    response.send(error)
  })
})

////////////////////////// oAuth ///////////////////////////
//express set up from article
app.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/public'
  })
})

app.listen(3500, function () {
  console.log('server is listening on port 3500...')
})

// passport setup
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

app.get('/success', function (req, res) {
  res.send('You have successfully logged in')
})

app.get('/error', function (res, req) {
  res.send('error logging in...')
})

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

// Facebook Auth
const FacebookStrategy = require('passport-facebook').Strategy

const FACEBOOK_APP_ID = '1218609321635653'
const FACEBOOK_APP_SERECT = 'afebe77a15b07c78ad8584a5b6e8e86f'

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SERECT,
  callbackURL: '/auth/facebook/callback'
},
function (accessToken, refreshToken, profile, cb) {
  return cb(null, profile)
}
))

app.get('/auth/facebook',
  passport.authenticate('facebook'))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function (req, res) {
    res.redirect('/success')
  })

// Google Login
const GOOGLE_CILENT_ID = '535967090840-dvh8ns1q1avbnbs8mkafhn1bfrup17n2.apps.googleusercontent.com'
const GOOGLE_CILENT_SERECT = 'FJFAwRoq6om2yisN-G2KiHTz'

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CILENT_ID,
  clientSecret: GOOGLE_CILENT_SERECT,
  callbackURL: 'http://localhost:3500/auth/google/callback',
  passReqToCallback: true
},
function (request, accessToken, refreshToken, profile, done) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user)
  })
}
))

app.get('/auth/google',
  passport.authenticate('google', { scope:
    ['https://www.googleapis.com/auth/plus.login']
  }))

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  })

// logout logic
// app.get('/logout', function(res, req, nextFn) {
//     req.logout()
//     //redirect to homepage
//     res.redirect('/')
// })
