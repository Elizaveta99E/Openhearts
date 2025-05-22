const express = require('express');
const router = express.Router();
const { Condition } = require('../models');

// Получить все особенности
router.get('/', async (req, res) => {
  try {
    const conditions = await Condition.findAll();
    res.json(conditions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить одну особенность по ID
router.get('/:id', async (req, res) => {
  try {
    const conditions = await Condition.findByPk(req.params.id);
    if (!conditions) {
      return res.status(404).json({ error: 'Условие не найдено' });
    }
    res.json(conditions);
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
    const newConditions = await Condition.create({ Name });
    res.status(201).json(newConditions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить особенность по ID
router.put('/:id', async (req, res) => {
  try {
    const { Name } = req.body;
    const [updated] = await Condition.update(
      { Name },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ error: 'Условие не найдено' });
    }
    const updatedConditions = await Condition.findByPk(req.params.id);
    res.json(updatedConditions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить особенность по ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Condition.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Условие не найдено' });
    }
    res.status(204).send(); // 204 - No Content (успешное удаление)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;