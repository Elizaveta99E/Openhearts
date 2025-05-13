const Router = require("express")
const router = new Router()
const AuthController = require('../controller/auth.controller')

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)
router.post('/create', AuthController.create)
router.put('/update', AuthController.update)
router.delete('/delete', AuthController.delete)
router.get('/get', AuthController.get)
router.get('/find', AuthController.find)
router.get('/check', AuthController.check)

module.exports = router