const Router = require('express');
const StaffController = require('../controller/staff.controller');
const EventController = require("../controller/event.controller");
const authMiddleware = require('../middleware/auth_middleware');
const VolunteerController = require("../controller/volunteer.controller");



const router = new Router();

router.post('/create', StaffController.create)
router.put('/update/:id', StaffController.update)
router.delete('/delete/:id', StaffController.delete)
router.get('/get', StaffController.get)
router.get('/find/:id', StaffController.find)
router.get('/check', StaffController.check)
router.post('/changePassword/:staffId', StaffController.changePassword)

module.exports = router