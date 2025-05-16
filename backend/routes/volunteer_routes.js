const Router = require('express');
const VolunteerController = require("../controller/volunteer.controller");
const authMiddleware = require('../middleware/auth_middleware');
const roleMiddleware = require('../middleware/auth_middleware');

const router = new Router();


router.post('/create', VolunteerController.create)
router.put('/update/:id', VolunteerController.update)
router.delete('/delete/:id', VolunteerController.delete)
router.get('/get', VolunteerController.get)
router.get('/find/:id', VolunteerController.find)
router.get('/check', VolunteerController.check)
router.post('/changePassword/:volunteerId', VolunteerController.changePassword)



module.exports = router