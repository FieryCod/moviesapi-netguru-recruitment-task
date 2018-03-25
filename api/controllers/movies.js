const debug = require('debug')('controllers:movies')
const NotFound = require('../errors/not-found')
const { commonHelper } = require('../helpers')
const { Movie } = require('../../db/models')
const omdb = require('../../services/omdb')
const uuidv1 = require('uuid/v1')
const _ = require('lodash')

function getMovies (req, res, next) {
  const [ limit, offset, page ] = commonHelper.getSwagParameters([ 'limit', 'offset', 'page' ], req)

  debug(`#getMovies: running`)
  debug(`#getMovies: limit ${limit}, offset ${offset}, page ${page}`)

  Movie
    .findAndCountAll({
      raw: true,
      offset: (page !== 1) ? (page * limit) : offset,
      subQuery: false,
      limit
    })
    .then(results => {
      res.json(results)
    })
}

function postMovie (req, res, next) {
  const title = commonHelper.getSwagParameter(req, 'movieInfo').title

  debug(`#postMovie: running`)
  debug(`#postMovie: Trying to get movie with title -> ${title}`)

  omdb
    .get({ t: title, plot: 'full' })
    .then(data => {
      const movie = commonHelper.getNormalizedObj(data.data,
        _.camelCase, commonHelper.propValueToArray([ 'Genre', 'Actors', 'Language' ]))

      debug(`Retrieved movie data: ${JSON.stringify(movie)}`)

      // Handle problems with the data
      if (movie.response === 'False') {
        return next(new NotFound(`Unable to find movie with title: ${title}`))
      }

      Movie
        .create(_.assign({ uuid: uuidv1() }, movie))
        .then(savedMovie => res.status(201).json(savedMovie))
        .catch(err => commonHelper.handleDbError(err, next))
    })
}

module.exports = {
  getMovies,
  postMovie
}
