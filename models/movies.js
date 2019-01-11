'use strict';
module.exports = (sequelize, DataTypes) => {
  const movies = sequelize.define('movies', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {});
  movies.associate = function(models) {
    movies.belongsToMany(models.users, {through: 'movie_users', foreignKey: 'movie_id'})
  };
  return movies;
};