const db = require('./models/db')
const Sequelize = require('sequelize')
const queries = {}
const Op = Sequelize.Op

// returning specific user back
// db.users.findOne({
//   where: {
//     id: 1
//   }
// })
//   .then(function (results) {
//     console.log(results.dataValues)
//   })

// return specific movie back by title

// db.movies.findAll({
//   where: {
//     title: {
//       [Op.like]: '%Happy%'
//     }
//   }
// })
//   .then(function (results) {
//     console.log(results.dataValues)
//     results.forEach(function (result) {
//       console.log(result.dataValues)
//     })
//   })

  // db.movies.findAll({
  //   where: {
  //     title: 'Hawking'
  //   },
  //   include: [{
  //     model: db.users,
  //     through: db.movie_users
  //   }]
  // })
  //   .then(function (results) {
  //     console.log(results)
  //   })

  // db.movies.update({
  //   where: {
  //     movie_id: 7,
  //     user_id: 8 
  //   },
  //   include: [{
  //     model: db.users,
  //     through: db.movie_users
  //   }]
  // })
  //   .then(function (results) {
  //     console.log(results.dataValues)
  // })
  // .catch (function (error) {
  //   console.log(error)
  // })



//   db.movies.findAll({
//     where: {
//       title: {
//         [Op.like]: '%' + movieSearch + '%'
//       }
//     }
//   })
//     .then(function (results) {
//         const data = results.map(function (result) {
//             return result.dataValues
//         })
//         response.send(data)

//     }) 
// })

// db.users.findAll({
//     where: {
//         id: 5
//     },
//     include: [{
//         model: db.movies
//     }]
// })
// .then(function(results){
//     console.log(results)
//     console.log(results[0].dataValues.movies[0].dataValues)
// })

// module.exports = queries
