const Router = require('express');
const EventController = require('../controller/event.controller');

const router = new Router();

router.post('/create', EventController.create)
router.get('/find', EventController.find)
router.get('/get', EventController.getAll)
router.put('/update', EventController.update)
router.delete('/delete', EventController.delete)
router.get('/check', EventController.check)

module.exports = router