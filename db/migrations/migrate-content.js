module.exports = function migrateContent () {
  const _ = require('lodash')

  // Movies
  const Movie = require('../models/movie/movie')
  const movies = require('./movies/movies')
  const moviesPromises = _.map(movies, (movie) => Movie.create(movie))

  // Comments
  const Comment = require('../models/movie/comment')
  const comments = require('./movies/comments')
  const commentsPromises = _.map(comments, (comment) => Comment.create(comment))

  return Promise.all([
    ...moviesPromises,
    ...commentsPromises
  ])
}
