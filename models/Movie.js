// create model and require db
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

// Movie extends Model
class Movie extends Model { }

// create table with columns (sequelize)
Movie.init({
  text: DataTypes.STRING,
  isWatched: DataTypes.BOOLEAN,
  comments: DataTypes.STRING
}, { sequelize, modelName: 'movie' })

// export Movie
module.exports = Movie
