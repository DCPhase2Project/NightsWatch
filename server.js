var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var db = require('./models/db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//Sessions 
var session = require('express-session')
var cookieParser = require('cookie-parser')
app.use(cookieParser())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

//Session Middleware
app.use(session({
  secret: 'keyboard cat'
}))
// passport setup
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())


passport.serializeUser(function (user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(function (userID, cb) {
  
  db.users.findAll({
    where: {
      id: userID
    }
  })
  .then(function(user) {
    console.log('Deseriazle User', user)
    cb(null, user[0].dataValues)
  })
  .catch (function (error){
    console.log(error)
  })
  
})


app.post('/send/data', function (req, res, nextFn) {
  let movieSearch = req.body.searchData

  // queries
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
})// post function

// adds data to join table
app.post('/saveto/watchlist', function (req, res, nextFn) {
  console.log(req.user.id, 'Req.user.id!!!!!!!!!!!!!!!!!!')
  const userID = req.user.id

  // users presses add button on html card and it renders to users database
  db.movie_users.create({
    user_id: userID,
    movie_id: req.body.searchData
  })
    .then(function (result) {
      res.send('saved to your list!')
    })
    .catch(function (error) {
      console.log(error)
    })
})

// Rendering Watchlist

app.post('/watchlist', function (req, res, nextFn) {
  // Placeholder for Session ID
  db.users.findAll({
    where: {
      id: req.body.searchData
    },
    include: [{
      model: db.movies,
      through: {
        attributes: [db.movies.id]
      }
    }]
  })
    .then(function (results) {
      const data = results.map(function (result) {
        return result.dataValues
      })
      res.send(data)
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.delete('/removefrom/watchlist', function (req, res, nextFn) {

  db.movie_users.destroy({
    where: {
      movie_id: req.body.movieId,
      user_id: req.body.userId
    }
  })
    .then(function (result) {
      res.send('removed from your list!')
    })
    .catch(function (error) {
      console.log(error)
    })
})

/// /////////////////////// oAuth ///////////////////////////
// express set up from article
app.get('/', function (req, res) {
  // console.log(req.session.token, 'MY TOKEN')

  res.sendFile('index.html', {
    root: __dirname + '/public'
  })
})


app.listen(3500, function () {
  console.log('server is listening on port 3500...')
})



app.get('/success', function (req, res) {
  res.send('You have successfully logged in')
})

app.get('/error', function (res, req) {
  res.send('error logging in...')
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

  let nameArray = profile.displayName.split(' ')
  let firstName = nameArray[0]
  let lastName = nameArray[1]

  db.users.findOrCreate({
    where: {
      fname: firstName,
      lname: lastName,
      email: 'Null',
      username: 'Null',
      googleId: profile.id
    }
  })
    .then(function (result) {
     console.log('THIS IS MY RESULT... ',result[0].dataValues)

      return done(null, result[0].dataValues)
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

  app.get('/user', function(req, res, nextFn) {
    if (req.user) {
      res.json({
        user: req.user
      })
    } else {
      res.redirect('/')
    }
  }) 


  