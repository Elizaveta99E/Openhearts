const Router = require('express');
const StaffController = require('../controller/staff.controller');
const EventController = require("../controller/event.controller");



const router = new Router();

router.post('/registration', StaffController.registration)
router.post('/login', StaffController.login)
router.get('/check', StaffController.check)
router.put('/update', StaffController.update)
router.delete('/delete', StaffController.delete)
router.get('/get', StaffController.get)
router.get('/find', StaffController.find)

module.exports = router