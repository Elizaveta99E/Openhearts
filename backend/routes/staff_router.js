const Router = require('express');
const StaffController = require('../controller/staff.controller');
const EventController = require("../controller/event.controller");
const authMiddleware = require('../middleware/auth_middleware');
const VolunteerController = require("../controller/volunteer.controller");

const {Staff, StaffRole, User} = require('../models');

const router = new Router();

router.post('/create', StaffController.create)
router.put('/update/:id', StaffController.update)
router.delete('/delete/:id', StaffController.delete)
router.get('/get', StaffController.get)
router.get('/find/:id', StaffController.find)
router.get('/check', StaffController.check)
router.post('/changePassword/:staffId', StaffController.changePassword)

router.post('/bulk', async (req, res) => {
    try {
      const conditionsList = req.body;
      if (!Array.isArray(conditionsList)) {
        return res.status(400).json({ error: 'Ожидается массив условий' });
      }
      
      const createdConditions = await Staff.bulkCreate(conditionsList);
      res.status(201).json(createdConditions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router