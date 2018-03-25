const migrateContent = require('../db/migrations/migrate-content')
const debug = require('debug')('sequelize:postgres:init')
const Sequelize = require('sequelize')

module.exports = function pgSequelizeInit () {
  ctx.pgSequelize = new Sequelize(
    ctx.env.POSTGRES_DB,
    ctx.env.POSTGRES_USER,
    ctx.env.POSTGRES_PASSWORD,
    {
      host: ctx.env.POSTGRES_HOST,
      dialect: 'postgres',
      protocol: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000, // 10 sec at most
        operatorsAliases: Sequelize.Op
      }
    }
  )

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
