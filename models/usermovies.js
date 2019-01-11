'use strict'
module.exports = (sequelize, DataTypes) => {
  const usermovies = sequelize.define('usermovies', {
    id: DataTypes.STRING,
    user_id: DataTypes.NUMBER,
    movie_id: DataTypes.STRING
  }, {})
  usermovies.associate = function (models) {
    // associations can be defined here
  }
  return usermovies
}
