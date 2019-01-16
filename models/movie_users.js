'use strict'
module.exports = (sequelize, DataTypes) => {
  const movie_users = sequelize.define('movie_users', {
    user_id: DataTypes.INTEGER,
    movie_id: DataTypes.INTEGER
  }, {})
  movie_users.associate = function (models) {

  };
  return movie_users;
};
