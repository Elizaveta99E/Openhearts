const Router = require('express');
const VolunteerController = require("../controller/volunteer.controller");
const {authMiddleware} = require('../middleware/auth_middleware');
const {roleMiddleware} = require('../middleware/auth_middleware');
const {Volunteer, sequelize} = require('../models');
const router = new Router();


router.post('/', VolunteerController.create)
router.put('/:id', VolunteerController.update)
router.delete('/:id', VolunteerController.delete)
router.get('/', VolunteerController.get)
router.get('/:id', VolunteerController.find)
router.get('/check', VolunteerController.check)
router.post('/changePassword/:volunteerId', VolunteerController.changePassword)
router.post('/participate', authMiddleware, async (req, res) => {
    try {
        await VolunteerEvent.create({
            VolunteerId: req.user.id,
            EventId: req.body.eventId,
            date: new Date()
        });
        res.json({ message: 'Успешная запись на мероприятие' });
    } catch (e) {
        res.status(500).json({ message: 'Ошибка записи' });
    }
});

router.post('/bulk', async (req, res) => {
    try {
      const conditionsList = req.body;
      if (!Array.isArray(conditionsList)) {
        return res.status(400).json({ error: 'Ожидается массив условий' });
      }
      
      const createdConditions = await Volunteer.bulkCreate(conditionsList);
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
          Volunteer.update(condition, {
          where: { id: condition.id },
          transaction
        })
      );

      // Ждем завершения всех операций обновления
      await Promise.all(updatePromises);

      // Получаем обновленные записи
      const updatedConditions = await Volunteer.findAll({
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