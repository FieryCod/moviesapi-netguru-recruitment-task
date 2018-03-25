const Comment = require('../../db/models/movie/comment')
const debug = require('debug')('controllers:comments')
const { commonHelper } = require('../helpers')
const uuidv1 = require('uuid/v1')
const _ = require('lodash')

function getComments (req, res, next) {
  const params = [ 'limit', 'offset', 'page', 'movieUuid' ]
  const [ limit, offset, page, movieUuid ] = commonHelper.getSwagParameters(params, req)

  debug(`#getComments: running`)
  debug(`#getComments: limit ${limit}, offset ${offset}, page ${page}`)

  const commentsSqlQuery = movieUuid ?
    {
      where: { movieUuid }
    } :
    {
      offset: (page !== 1) ? (page * limit) : offset,
      limit
    }

  Comment
    .findAndCountAll(_.assign({ raw: true, subQuery: false }, commentsSqlQuery))
    .then(results => {
      res.json(results)
    })
}

function postComment (req, res, next) {
  const comment = commonHelper.getSwagParameter(req, 'comment', {})

  debug(`#postComment: running`)
  debug(`#postComment: Post comment with data: ${JSON.stringify(comment)}`)

  Comment
    .create(_.assign({ uuid: uuidv1() }, comment))
    .then(savedComment => res.status(201).json(savedComment))
    .catch(err => commonHelper.handleDbError(err, next))
}

module.exports = {
  getComments,
  postComment
}
