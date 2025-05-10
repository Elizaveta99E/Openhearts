const Router = require('express');
const VolunteerController = require("../controller/volunteer.controller");

const router = new Router();



router.post('/registration', VolunteerController.registration)
router.post('/login', VolunteerController.login)
router.get('/check', VolunteerController.check)
router.put('/update', VolunteerController.update)
router.delete('/delete', VolunteerController.delete)
router.get('/get', VolunteerController.get)
router.get('/find', VolunteerController.find)


module.exports = router