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
router.post('/participate', authMiddleware, async (req, res) => {
    try {
        await VolunteerEvent.create({
            VolunteerId: req.user.id,
            EventId: req.body.eventId,
            date: new Date()
        });
        res.json({ message: 'Успешная запись на мероприятие' });
    } catch (e) {
        res.status(500).json({ message: 'Ошибка записи' });
    }
});



module.exports = router