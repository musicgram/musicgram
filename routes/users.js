const router = require('express').Router()

const auth = require('../middlewares/index')
const { register, login, getUsers, verifyUser,addMusic } = require('../controllers/user_controller')

router.post('/register',register)

router.post('/login',login)

router.get('/',getUsers)
router.post('/addMusic',auth,addMusic)

router.get('/verify',verifyUser)

module.exports = router