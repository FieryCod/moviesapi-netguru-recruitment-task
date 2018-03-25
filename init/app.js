const pgSequelizeInit = require('./pg-sequelize')
const middlewares = require('../middlewares')
const debug = require('debug')('app:init')

module.exports = async function initApp () {
  function appListen () {
    ctx.app.listen(ctx.env.PORT)
    debug(`Listening on port ${ctx.env.PORT}`)
  }

  async function resolveMiddlewares () {
    for (const mw of middlewares) {
      await mw(ctx)
    }
  }

  // Init connection to the postgresDB
  pgSequelizeInit()

  try {
    resolveMiddlewares()
    appListen()
  } catch (err) {
    throw err
  }
}
