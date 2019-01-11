var express = require('express')
var bodyParser = require('body-parser')


var app = express()
var db = require('./models')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))


//Sequelize
const Sequelize = require('sequelize')
const sequelize = new Sequelize('database')

//why did a 'get' not work here???
app.post('/send/data', function(request, response, nextFn) {
    let movieSearch = request.body.searchData
    console.log(movieSearch)

    // var movieDB = sequelize.define('movieDB',)
})

db.movies_db.findAll()
    .then(function(result) {
        console.log(result)
    })


app.listen(3500, function() {
    console.log('server is listening on port 3500...')
})