const Router = require('express');
const VolunteerController = require("../controller/volunteer.controller");

const router = new Router();


router.put('/update', VolunteerController.update)
router.delete('/delete', VolunteerController.delete)
router.get('/get', VolunteerController.get)
router.get('/find', VolunteerController.find)


module.exports = router