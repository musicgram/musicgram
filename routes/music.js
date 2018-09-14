const routes = require('express').Router()
const controller = require('../controllers/index')
const upload = require('../helpers/index')
const authentication = require('../middlewares/index');

routes.get('/user', authentication, controller.music.findByUser);
routes.get('/', controller.music.findAll);
routes.delete('/:id', authentication, controller.music.remove);

routes.post(
  '/upload',
  upload.multer.single('image'), 
  upload.sendUploadToGCS,
  controller.music.upload
);

routes.post('/musics',authentication,controller.music.create)

module.exports = routes;