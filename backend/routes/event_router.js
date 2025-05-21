const Router = require('express');
const EventController = require('../controller/event.controller');
const VolunteerController = require("../controller/volunteer.controller");
const express = require('express');
const { Events, EventsStatus } = require('../models');
const router = express.Router();




// Получить все мероприятия
router.get('/check', async (req, res) => {
    try {
      const role = await Events.findAll();
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


router.post('/create', EventController.create)
router.get('/get', EventController.getAll)
router.put('/update/:id', EventController.update)
router.get('/find/:id', EventController.find)
router.delete('/delete/:id', EventController.delete)

router.get('/active-count', async (req, res) => {
    try {
      const activeStatus = await EventsStatus.findOne({ where: { Name: 'Активно' } });
      const count = await Events.count({ where: { Status: activeStatus.id } });
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.post('/bulk', async (req, res) => {
    try {
      const conditionsList = req.body;
      if (!Array.isArray(conditionsList)) {
        return res.status(400).json({ error: 'Ожидается массив условий' });
      }
      
      const createdConditions = await Events.bulkCreate(conditionsList);
      res.status(201).json(createdConditions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router
// Обновление события по ID (PUT /events/:id)
router.put('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const eventData = req.body;

      // Проверяем, существует ли событие
      const event = await Events.findByPk(id);
      if (!event) {
          return res.status(404).json({ error: 'Событие не найдено' });
      }

      // Обновляем данные
      await event.update(eventData);

      // Возвращаем обновленное событие
      res.json(event);
  } catch (error) {
      console.error('Ошибка при обновлении события:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
  }
});
