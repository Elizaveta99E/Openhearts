const Router = require('express');
const VolunteerController = require("../controller/volunteer.controller");

const router = new Router();


router.post('/create', VolunteerController.create)
router.put('/update/:id', VolunteerController.update)
router.delete('/delete/:id', VolunteerController.delete)
router.get('/get', VolunteerController.get)
router.get('/find/:id', VolunteerController.find)
router.get('/check', VolunteerController.check)



module.exports = router