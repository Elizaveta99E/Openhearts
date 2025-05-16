const express = require('express');
const router = express.Router();
const { StaffRoles } = require('../models');

// Получить все особенности
router.get('/', async (req, res) => {
  try {
    const role = await StaffRoles.findAll();
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить одну особенность по ID
router.get('/:id', async (req, res) => {
  try {
    const role = await StaffRoles.findByPk(req.params.id);
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
    const newStaffRoles = await StaffRoles.create({ Name });
    res.status(201).json(newStaffRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить особенность по ID
router.put('/:id', async (req, res) => {
  try {
    const { Name } = req.body;
    const [updated] = await StaffRoles.update(
      { Name },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ error: 'Условие не найдено' });
    }
    const updatedStaffRoles = await StaffRoles.findByPk(req.params.id);
    res.json(updatedStaffRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить особенность по ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await StaffRoles.destroy({
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