const express = require('express');
const router = express.Router();
const { Course, sequelize } = require('../models');

// Получить все особенности
router.get('/', async (req, res) => {
  try {
    const course = await Course.findAll();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить одну особенность по ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Условие не найдено' });
    }
    res.json(course);
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
    const newCourse = await Course.create({ Name });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Удалить особенность по ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Course.destroy({
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
    
    const createdConditions = await Course.bulkCreate(conditionsList);
    res.status(201).json(createdConditions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Обновление массива
router.put('/bulk', async (req, res) => {
  try {
    const conditionsList = req.body;
    
    if (!Array.isArray(conditionsList)) {
      return res.status(400).json({ error: 'Ожидается массив условий' });
    }

    // Проверяем, есть ли у всех элементов ID (необходим для обновления)
    if (conditionsList.some(item => !item.id)) {
      return res.status(400).json({ error: 'Все элементы должны содержать ID для обновления' });
    }

    // Создаем транзакцию для обеспечения атомарности операций
    const transaction = await sequelize.transaction();

    try {
      // Обновляем каждую запись в массиве
      const updatePromises = conditionsList.map(condition => 
        Course.update(condition, {
          where: { id: condition.id },
          transaction
        })
      );

      // Ждем завершения всех операций обновления
      await Promise.all(updatePromises);

      // Получаем обновленные записи
      const updatedConditions = await Course.findAll({
        where: {
          id: conditionsList.map(condition => condition.id)
        },
        transaction
      });

      // Фиксируем транзакцию
      await transaction.commit();

      res.status(200).json(updatedConditions);
    } catch (error) {
      // Откатываем транзакцию в случае ошибки
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;