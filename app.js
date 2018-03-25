const appInit = require('./init/app')
const app = require('express')()

// Bind global context
global.ctx = {
  env: process.env,
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  appRoot: __dirname,
  app
}

// Init app
appInit()

module.exports = app
