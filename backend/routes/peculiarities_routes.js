const express = require('express');
const router = express.Router();
const { Peculiarity } = require('../models');
router.post('/bulk', async (req, res) => {
  try {
    const conditionsList = req.body;
    if (!Array.isArray(conditionsList)) {
      return res.status(400).json({ error: 'Ожидается массив условий' });
    }
    
    const createdConditions = await Peculiarity.bulkCreate(conditionsList);
    res.status(201).json(createdConditions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить все особенности
router.get('/', async (req, res) => {
  try {
    const peculiarities = await Peculiarity.findAll();
    res.json(peculiarities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить одну особенность по ID
router.get('/:id', async (req, res) => {
  try {
    const peculiarity = await Peculiarity.findByPk(req.params.id);
    if (!peculiarity) {
      return res.status(404).json({ error: 'Особенность не найдена' });
    }
    res.json(peculiarity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Создать новую особенность
router.post('/', async (req, res) => {
  try {
    const { Name } = req.body;
    if (!Name) {
      return res.status(400).json({ error: 'Название обязательно' });
    }
    const newPeculiarity = await Peculiarity.create({ Name });
    res.status(201).json(newPeculiarity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить особенность по ID
router.put('/:id', async (req, res) => {
  try {
    const { Name } = req.body;
    const [updated] = await Peculiarity.update(
      { Name },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ error: 'Особенность не найдена' });
    }
    const updatedPeculiarity = await Peculiarity.findByPk(req.params.id);
    res.json(updatedPeculiarity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить особенность по ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Peculiarity.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Особенность не найдена' });
    }
    res.status(204).send(); // 204 - No Content (успешное удаление)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;