const router = require('express').Router()
const { register, login, getUsers, verifyUser,addMusic } = require('../controllers/user_controller')

const auth = require('../middlewares/index')

router.post('/register',register)

router.post('/login',login)

router.get('/',getUsers)

router.get('/verify',verifyUser)

router.post('/addMusic',auth,addMusic)
module.exports = router