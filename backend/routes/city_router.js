const express = require('express');
const router = express.Router();
const { City, sequelize } = require('../models');


router.post('/bulk', async (req, res) => {
    try {
      const conditionsList = req.body;
      if (!Array.isArray(conditionsList)) {
        return res.status(400).json({ error: 'Ожидается массив условий' });
      }
      
      const createdConditions = await City.bulkCreate(conditionsList);
      res.status(201).json(createdConditions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.get('/', async (req, res) =>  {
    try {
      console.log('Запрос списка городов...'); // Логирование
      const cities = await City.findAll({
        attributes: ['id', 'name'], // Явно указываем нужные поля
        order: [['name', 'ASC']]   // Сортировка по имени
      });

      console.log('Найдены города:', cities.map(c => c.name)); // Логирование

      res.json(cities);
    } catch (e) {
      console.error('Ошибка при получении городов:', e);
      res.status(500).json({ error: e.message });
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
        City.update(condition, {
          where: { id: condition.id },
          transaction
        })
      );

      // Ждем завершения всех операций обновления
      await Promise.all(updatePromises);

      // Получаем обновленные записи
      const updatedConditions = await City.findAll({
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