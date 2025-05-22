const express = require('express');
const router = express.Router();
const { ConditionsOfEvents } = require('../models');


router.post('/bulk', async (req, res) => {
    try {
      const conditionsList = req.body;
      if (!Array.isArray(conditionsList)) {
        return res.status(400).json({ error: 'Ожидается массив условий' });
      }
      
      const createdConditions = await ConditionsOfEvents.bulkCreate(conditionsList);
      res.status(201).json(createdConditions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.get('/', async (req, res, next) => {
    try {
        const staff = await ConditionsOfEvents.findAll();
        
        if (!staff || staff.length === 0) {
            return res.status(404).json({ error: 'Сотрудники не найдены' });
        }

        res.json(staff);
    } catch (error) {
        console.error('Ошибка при получении списка сотрудников:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

  module.exports = router;