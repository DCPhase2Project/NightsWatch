'use strict';
module.exports = (sequelize, DataTypes) => {
  const movies_db = sequelize.define('movies_db', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    genres: DataTypes.STRING
  }, {});
  movies_db.associate = function(models) {
    // associations can be defined here
  };
  return movies_db;
};