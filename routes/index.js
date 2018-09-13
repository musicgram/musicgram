const routes = require('express').Router()
const user = require('./users')
const music = require('./music')

routes.use('/users',user)
routes.use('/',music)

module.exports = routes