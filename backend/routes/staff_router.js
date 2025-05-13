const Router = require('express');
const StaffController = require('../controller/staff.controller');
const EventController = require("../controller/event.controller");
const authMiddleware = require('../middleware/auth_middleware');



const router = new Router();

router.post('/create', StaffController.create)
router.put('/update', StaffController.update)
router.delete('/delete', StaffController.delete)
router.get('/get', StaffController.get)
router.get('/find', StaffController.find)

module.exports = router