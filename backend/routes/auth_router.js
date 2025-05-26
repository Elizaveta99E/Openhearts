const Router = require("express")
const router = new Router()
const AuthController = require('../controller/auth.controller')

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/check', AuthController.check) //проверка пользователь в системе или нет

router.get('/login', (req, res) => res.render('log_in'));
router.get('/registration', (req, res) => res.render('registration'));

module.exports = router