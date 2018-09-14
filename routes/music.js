const routes = require('express').Router()
const controller = require('../controllers/index')
const upload = require('../helpers/index')

routes.post('/upload',
  upload.multer.single('image'), 
  upload.sendUploadToGCS,
  controller.music.upload)

  module.exports = routes