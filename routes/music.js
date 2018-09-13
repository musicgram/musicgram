const routes = require('express').Router()
const controller = require('../controllers/index')
const upload = require('../helpers/index')
const auth = require('../middlewares/index')

routes.post('/upload',
  upload.multer.single('image'), 
  upload.sendUploadToGCS,
  controller.music.upload)

// routes.post('/musics',auth,controller.music.create)

  module.exports = routes