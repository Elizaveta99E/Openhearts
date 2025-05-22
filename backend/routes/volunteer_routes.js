const Router = require('express');
const VolunteerController = require("../controller/volunteer.controller");
const authMiddleware = require('../middleware/auth_middleware');
const roleMiddleware = require('../middleware/auth_middleware');
const {Volunteer} = require('../models');
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

router.post('/bulk', async (req, res) => {
    try {
      const conditionsList = req.body;
      if (!Array.isArray(conditionsList)) {
        return res.status(400).json({ error: 'Ожидается массив условий' });
      }
      
      const createdConditions = await Volunteer.bulkCreate(conditionsList);
      res.status(201).json(createdConditions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router