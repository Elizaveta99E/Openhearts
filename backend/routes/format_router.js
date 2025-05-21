const express = require('express');
const router = express.Router();
const { Format } = require('../models');


router.post('/bulk', async (req, res) => {
    try {
      const conditionsList = req.body;
      if (!Array.isArray(conditionsList)) {
        return res.status(400).json({ error: 'Ожидается массив условий' });
      }
      
      const createdConditions = await Format.bulkCreate(conditionsList);
      res.status(201).json(createdConditions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.get('/', async (req, res) => {
    try {
      const conditions = await Format.findAll();
      res.json(conditions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;