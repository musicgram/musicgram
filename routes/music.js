const routes = require('express').Router()
const controller = require('../controllers/index')
const upload = require('../helpers/index')

routes.get('/', controller.music.findAll);
routes.post(
  '/upload',
  upload.multer.single('music'), 
  upload.sendUploadToGCS,
  controller.music.upload
);

module.exports = routes;