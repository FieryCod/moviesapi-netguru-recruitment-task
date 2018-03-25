const apicache = require('apicache')
const cache = apicache.middleware

// Varnish cache would be much more appropriate here
module.exports = function () {
  ctx.app.use(cache('2 minutes'))
}
