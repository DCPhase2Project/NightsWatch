var express = require('express')
var bodyParser = require('body-parser')


var app = express()
var db = require('./models')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))



//why did a 'get' not work here???
app.post('/send/data', function(request, response, nextFn) {
    let movieSearch = request.body.searchData
    console.log(movieSearch)
    response.send(movieSearch)
})


// db.movies_db.movies.findAll()
//     .then(function(result) {
//         console.log(result)
//     })

//express set up from article
app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/public'
    })
})

app.listen(3500, function() {
    console.log('server is listening on port 3500...')
})

//passport setup
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

app.get('/success', function (req, res) {
    res.send('You have successfully logged in')
})

app.get('/error', function (res, req) {
    res.send('error logging in...')
})

passport.serializeUser(function(user, cb) {
    cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
    cb(null, obj)
})

//Facebook Auth
const FacebookStrategy = require('passport-facebook').Strategy

const FACEBOOK_APP_ID = '1218609321635653'
const FACEBOOK_APP_SERECT = 'afebe77a15b07c78ad8584a5b6e8e86f'

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SERECT,
    callbackURL: '/auth/facebook/callback'
},
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
    }
))

app.get('/auth/facebook', 
    passport.authenticate('facebook'))

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/error'}),
    function(req, res) {
        res.redirect('/success')
    })