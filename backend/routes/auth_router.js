const Router = require("express")
const router = new Router()
const AuthController = require('../controller/auth.controller')

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/check', AuthController.check)

module.exports = router