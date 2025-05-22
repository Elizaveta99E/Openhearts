const Router = require('express');
const StaffController = require('../controller/staff.controller');
const EventController = require("../controller/event.controller");
const authMiddleware = require('../middleware/auth_middleware');
const VolunteerController = require("../controller/volunteer.controller");

const {Staff, sequelize, StaffRole, User} = require('../models');

const router = new Router();

router.post('/create', StaffController.create)
router.put('/update/:id', StaffController.update)
router.delete('/delete/:id', StaffController.delete)
router.get('/get', StaffController.get)
router.get('/find/:id', StaffController.find)
router.get('/check', StaffController.check)
router.post('/changePassword/:staffId', StaffController.changePassword)

router.post('/bulk', async (req, res) => {
    try {
      const conditionsList = req.body;
      if (!Array.isArray(conditionsList)) {
        return res.status(400).json({ error: 'Ожидается массив условий' });
      }
      
      const createdConditions = await Staff.bulkCreate(conditionsList);
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
        Staff.update(condition, {
          where: { id: condition.id },
          transaction
        })
      );

      // Ждем завершения всех операций обновления
      await Promise.all(updatePromises);

      // Получаем обновленные записи
      const updatedConditions = await Staff.findAll({
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


module.exports = router