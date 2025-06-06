const Router = require('express');
const EventController = require('../controller/event.controller');
const VolunteerController = require("../controller/volunteer.controller");
const express = require('express');
const { Event, EventStatus, sequelize } = require('../models');
const eventController = require('../controller/event.controller');
const router = express.Router();




// Получить все мероприятия
router.get('/check', async (req, res) => {
    try {
      const role = await Event.findAll();
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


router.post('/', EventController.create)
router.get('/', EventController.getAll)
router.put('/:id', EventController.update)
router.get('/:id', EventController.getOne)
router.delete('/:id', EventController.delete)
router.patch('/:id/status', EventController.updateStatus);
router.get('/filter', EventController.getFiltered);

router.get('/active-count', async (req, res) => {
    try {
      const activeStatus = await EventStatus.findOne({ where: { Name: "Активно" } });
      const count = await Event.count({ where: { Status: activeStatus.id } });
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

      const createdConditions = await Event.bulkCreate(conditionsList);
      res.status(201).json(createdConditions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Обновление события по ID (PUT /events/:id)
router.put('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const eventData = req.body;

      // Проверяем, существует ли событие
      const event = await Event.findByPk(id);
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

module.exports = router