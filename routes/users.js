const router = require('express').Router()
const { register, login, getUsers, verifyUser } = require('../controllers/user_controller')

router.post('/register',register)

router.post('/login',login)

router.get('/',getUsers)

router.get('/verify',verifyUser)

module.exports = router