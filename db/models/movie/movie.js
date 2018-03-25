const Sequelize = require('sequelize')

const Movie = ctx.pgSequelize.define('movie', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  title: {
    type: Sequelize.TEXT,
    unique: true
  },
  year: Sequelize.INTEGER,
  rated: Sequelize.TEXT,
  released: Sequelize.DATE,
  runtime: Sequelize.TEXT,
  genre: Sequelize.ARRAY(Sequelize.TEXT),
  director: Sequelize.TEXT,
  writer: Sequelize.TEXT,
  actors: Sequelize.ARRAY(Sequelize.TEXT),
  plot: Sequelize.TEXT,
  language: Sequelize.ARRAY(Sequelize.TEXT),
  country: Sequelize.TEXT,
  awards: Sequelize.TEXT,
  poster: Sequelize.TEXT,
  ratings: Sequelize.ARRAY(Sequelize.JSON),
  metascore: Sequelize.TEXT,
  imdbRating: Sequelize.TEXT,
  imdbVotes: Sequelize.TEXT,
  imdbId: Sequelize.TEXT,
  type: {
    type: Sequelize.TEXT,
    default: 'movie'
  },
  dvd: Sequelize.TEXT,
  boxOffice: Sequelize.TEXT,
  production: Sequelize.TEXT,
  website: Sequelize.TEXT,
  response: Sequelize.BOOLEAN
})

module.exports = Movie
