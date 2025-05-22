const express = require('express');
const router = express.Router();
const { StaffRole } = require('../models');

// Получить все особенности
router.get('/', async (req, res) => {
  try {
    const role = await StaffRole.findAll();
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить одну особенность по ID
router.get('/:id', async (req, res) => {
  try {
    const role = await StaffRole.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Условие не найдено' });
    }
    res.json(role);
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
    const newStaffRoles = await StaffRole.create({ Name });
    res.status(201).json(newStaffRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить особенность по ID
router.put('/:id', async (req, res) => {
  try {
    const { Name } = req.body;
    const [updated] = await StaffRole.update(
      { Name },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ error: 'Условие не найдено' });
    }
    const updatedStaffRoles = await StaffRole.findByPk(req.params.id);
    res.json(updatedStaffRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить особенность по ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await StaffRole.destroy({
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
router.post('/bulk', async (req, res) => {
  try {
    const conditionsList = req.body;
    if (!Array.isArray(conditionsList)) {
      return res.status(400).json({ error: 'Ожидается массив условий' });
    }
    
    const createdConditions = await StaffRole.bulkCreate(conditionsList);
    res.status(201).json(createdConditions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;