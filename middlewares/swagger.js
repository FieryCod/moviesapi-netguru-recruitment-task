const { promisify } = require('util')

const swagExpressMw = promisify(require('swagger-express-mw').create)

module.exports = async function () {
  const swagExpress = await swagExpressMw({ appRoot: ctx.appRoot })

  // register swagger middleware for the app
  swagExpress.register(ctx.app)
}
