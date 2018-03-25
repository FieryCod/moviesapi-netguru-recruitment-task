const Sequelize = require('sequelize')
const Movie = require('./movie')

const Comment = ctx.pgSequelize.define('comment', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  movieUuid: {
    type: Sequelize.UUID
  },
  text: {
    type: Sequelize.TEXT
  }
})

Comment.belongsTo(Movie)

module.exports = Comment
