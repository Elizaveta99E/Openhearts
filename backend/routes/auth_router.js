const Router = require("express")
const router = new Router()
const AuthController = require('../controller/auth_controller')

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)

module.exports = router