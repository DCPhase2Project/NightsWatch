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
  //TODO: get userID coded here
  const userID = 2

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

// remove data from join table
app.delete('/removefrom/watchlist', function (req, res, nextFn) {

  // users presses add button on html card and it renders to users database
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
  // console.log(profile)
  // console.log('---------------')

  let nameArray = profile.displayName.split(' ')
  let fname = nameArray[0]
  let lname = nameArray[1]

  db.users.findOrCreate({
    where: {
      fname: fname,
      lname: lname,
      email: 'Null',
      username: 'Null'
    }
  })
    .then(function (result) {
      // console.log(result)
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
  // console.log(request.body)
  // console.log('return value from Google:', profile)
  // console.log('--------------------------')

  let nameArray = profile.displayName.split(' ')
  let firstName = nameArray[0]
  let lastName = nameArray[1]

  // console.log(request.user , 'THIS IS REQUEST USER!!!!!!!!!!!!!!')

  // request.session.fname = firstName
  // request.session.lname = lastName

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
    // console.log('THIS IS MY RESULT... ',result)

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

    // console.log('req.user', req.user);
    // req.session.token = req.user.token
    // console.log(req.session.token)
    //accessing session data
    // res.send(req.session.fname + ' ' + req.session.lname)
    
    res.redirect('/')
  })

  app.get('/user', function(req, res, nextFn) {
    if (req.user) {
      res.json({
        user: req.user
      })
    } else {
      res.redirect('/auth/google')
    }
  }) 

  // write app.get('/get/user')
  // check for req.user
  // if it's there res.json({user: req.user});


