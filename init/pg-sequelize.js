const migrateContent = require('../db/migrations/migrate-content')
const debug = require('debug')('sequelize:postgres:init')
const Sequelize = require('sequelize')

module.exports = function pgSequelizeInit () {
  ctx.pgSequelize = new Sequelize(ctx.env.DATABASE_URL)

  ctx
    .pgSequelize
    .authenticate()
    .then(() => {
      debug('Sequelize is connected to the postgres RDBS')

      ctx.pgSequelize
        .sync(ctx.isDev || ctx.isTest ? ({ force: true }) : ({}))
        .then(() => ctx.isDev || ctx.isTest ? migrateContent() : null)
    })
    .catch(err => {
      debug(`Error occured while trying to connect to the postgres RDBS, error: ${err}`)
    })
}
