var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var db = require('./models/db')
const Sequelize = require('sequelize')
const queries = {}
const Op = Sequelize.Op
//db.movie_users.hasMany(db.movies, {foreignKey: 'id'})
//db.movie_users.belongsTo(db.movies, {foreignKey: 'movie_id'})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

app.post('/send/data', function(req, res, nextFn) {
    let movieSearch = req.body.searchData

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
            res.send(data)
  
        }) 
})//post function

//adds data to join table 
app.post('/saveto/watchlist', function(request, respone, nextFn) {
  let movieSearch = request.body.searchData
  console.log(movieSearch)

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

// Rendering Watchlist 

app.get ('/watchlist', function (req, res, nextFn) {
  // Placeholder for Session ID
  db.users.find ({
    where: {
      id: 23
    }
  , include: [db.movies]
})
  .then (function (data) {
    console.log (data)
   const watchlistHTML = data.movies.map(function (movieData){
    console.log (movieData.title)
    console.log (movieData)

      return `<li><h3>${movieData.title}</h3></li>` 
       
    })
    console.log(watchlistHTML)
    console.log(typeof watchlistHTML)
    res.send(watchlistHTML.join(''))
  })
   
})

//adds data to join table
app.post('/watchlist/:movieID', function (request, response, nextFn) {
  const userID = 19

  //TODO: Take userID from html object
  db.movie_users.findOrCreate({
    where: {
      movie_id: request.params.movieID,
      user_id: userID
    }     
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
  console.log(profile)
  console.log('---------------')

  let nameArray = profile.displayName.split(" ")
  let fname = nameArray[0]
  let lname = nameArray[1]

  db.users.findOrCreate({
    where: {
      fname: fname,
      lname: lname,  
      email: "Null",
      username: "Null"
    }     
  })
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.log(error)
  })
  

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
  console.log(request.body)
  console.log('return value from Google:', profile)
  console.log('--------------------------')

  let nameArray = profile.displayName.split(" ")
  let firstName = nameArray[0]
  let lastName = nameArray[1]

  db.users.findOrCreate({ 
    where: {
      fname: firstName,
      lname: lastName,
      email: "Null",
      username: "Null",
      googleId: profile.id 
    }
    // return done(err, user)
  })
  .then(function (result) {
    // console.log(result)
    return done(null, result)
  })
  .catch(function (error) {
    console.log(error)
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
