'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    googleId: DataTypes.STRING
  }, {})
  users.associate = function (models) {
    users.belongsToMany(models.movies, { through: 'movie_users', foreignKey: 'user_id' })
  }
  return users
}
