const helmet = require('helmet')

module.exports = function () {
  ctx.app.use(helmet())
}
