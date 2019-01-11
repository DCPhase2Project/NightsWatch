const db = require('./models')

//returning all the users back
// db.users.findOne({
//     where: {
//         fname: 'Shel'
//     }
// })
// .then(function(results) {
//     const simpleResults = results.get({plain: true})
//     console.log(simpleResults)
// })

// db.movie_users.findAll({
//     where: {
//         user_id: 1
//     },
//     include: [{
//         model: db.users,
//         through: db.movie_users
//     }]
// })
// .then(function(results){
//     console.log(results)
// })

db.users.findAll({
    where: {
        id: 5
    },
    include: [{
        model: db.movies
    }]
})
.then(function(results){
    console.log(results)
    //console.log(results[0].dataValues.movies[0].dataValues)
})