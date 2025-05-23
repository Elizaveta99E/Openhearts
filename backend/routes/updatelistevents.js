const express = require('express');
const router = express.Router();
const { Event } = require('../models'); // Импортируйте вашу модель Event
router.get('/', async (req, res) => {
    try {
      const role = await Event.findAll();
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Обновление массива событий
router.put('/', async (req, res) => {
    try {
        const eventsToUpdate = req.body; // Массив событий из тела запроса

        // Обновление каждого события по id
        const updatePromises = eventsToUpdate.map(async (eventData) => {
            const { id, ...updateData } = eventData; // Извлекаем id и остальные данные
            const [updated] = await Event.update(updateData, {
                where: { id },
            });
            return updated;
        });

        // Ожидание завершения всех обновлений
        const results = await Promise.all(updatePromises);

        // Отправляем ответ
        res.status(200).json({ updated: results });
    } catch (error) {
        console.error('Error updating events:', error);
        res.status(500).json({ message: 'Ошибка при обновлении событий', error });
    }
});

module.exports = router;
