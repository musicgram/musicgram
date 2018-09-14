const routes = require('express').Router()
const controller = require('../controllers/index')
const upload = require('../helpers/index')
const authentication = require('../middlewares/index');

routes.get('/user', authentication, controller.music.findByUser);
routes.get('/', controller.music.findAll);
routes.post(
  '/upload',
  upload.multer.single('music'), 
  upload.sendUploadToGCS,
  controller.music.upload
);

module.exports = routes;