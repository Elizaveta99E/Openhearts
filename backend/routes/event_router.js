const Router = require('express');
const EventController = require('../controller/event.controller');
const VolunteerController = require("../controller/volunteer.controller");

const router = new Router();

router.get('/check', EventController.check)
router.post('/create', EventController.create)
router.get('/get', EventController.getAll)
router.put('/update/:id', EventController.update)
router.get('/find/:id', EventController.find)
router.delete('/delete/:id', EventController.delete)


module.exports = router