const express = require('express');
const router = express.Router();
const { Event, EventStatus, Activity, User, Course } = require('../models');
const { Op, Sequelize } = require('sequelize');

// Получение списка направлений
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Количество активных мероприятий
router.get('/active-events', async (req, res) => {
  try {
    const { courseId } = req.query;
    const activeStatus = await EventStatus.findOne({ where: { name: 'Активно' } });
    
    const where = { statusId: activeStatus.id };
    if (courseId) where.courseId = courseId;

    const count = await Event.count({ where });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Количество проведенных мероприятий за год
router.get('/completed-this-year', async (req, res) => {
  try {
    const { courseId } = req.query;
    const currentYear = new Date().getFullYear();
    const completedStatus = await EventStatus.findOne({ where: { name: 'Успешно пройдено' } });

    const where = {
      statusId: completedStatus.id,
      [Op.or]: [
        Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "startDate"')), currentYear),
        Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "endDate"')), currentYear)
      ]
    };
    if (courseId) where.courseId = courseId;

    const count = await Event.count({ where });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Количество мероприятий без волонтеров!!!!
router.get('/events-need-volunteers', async (req, res) => {
  try {
    const { courseId } = req.query;
    const activeStatus = await EventStatus.findOne({ where: { name: 'Активно' } });

    const events = await Event.findAll({
      where: courseId ? { statusId: activeStatus.id, courseId } : { statusId: activeStatus.id },
      include: [{
        model: Activity,
        
        required: false
      }]
    });

    const count = events.filter(event => {
      const volunteersCount = event.Activity ? event.Activity.length : 0;
      return event.needs > volunteersCount;
    }).length;

    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Количество новых волонтеров
router.get('/new-volunteers', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const count = await User.count({
      where: Sequelize.where(
        Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "regDate"')), 
        currentYear
      )
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Активность волонтеров по месяцам
router.get('/volunteer-activity', async (req, res) => {
  try {
    const { courseId } = req.query;
    const where = {};
    if (courseId) {
      where['$Event.courseId$'] = courseId;
    }

    const activities = await Activity.findAll({
      attributes: [
        [Sequelize.fn('TO_CHAR', Sequelize.col('Activity.Datetime'), 'Month'), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('Activity.Datetime')), 'count']
      ],
      include: [{
        model: Event,
        attributes: [],
        where
      }],
      group: ['month'],
      raw: true
    });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Проваленные мероприятия по годам
router.get('/failed-events-by-year', async (req, res) => {
  try {
    const { courseId } = req.query;
    const failedStatus = await EventStatus.findOne({ where: { name: 'Провалено' } });

    const where = { statusId: failedStatus.id };
    if (courseId) where.courseId = courseId;

    const events = await Event.findAll({
      attributes: [
        [Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "endDate"')), 'year'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where,
      group: ['year'],
      order: [['year', 'ASC']],
      raw: true
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Новые волонтеры по годам
router.get('/new-volunteers-by-year', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        [Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "regDate"')), 'year'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: ['year'],
      order: [['year', 'ASC']],
      raw: true
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Мероприятия, нуждающиеся в волонтерах!!!!
router.get('/events-need-volunteers-list', async (req, res) => {
  try {
    const { courseId } = req.query;
    const activeStatus = await EventStatus.findOne({ where: { name: 'Активно' } });

    const events = await Event.findAll({
      where: courseId ? { statusId: activeStatus.id, courseId } : { statusId: activeStatus.id },
      include: [{
        model: Activity,
        
        required: false
      }]
    });

    const filteredEvents = events.filter(event => {
      const volunteersCount = event.Activities ? event.Activities.length : 0;
      return event.needs > volunteersCount;
    });

    res.json(filteredEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Добавьте этот код в ваш analitic.js перед module.exports = router;

// Комплексный endpoint для всех данных дашборда
router.get('/dashboard-data', async (req, res) => {
    try {
      const { courseId } = req.query;
      
      // Получаем все статусы один раз
      const [activeStatus, completedStatus, failedStatus] = await Promise.all([
        EventStatus.findOne({ where: { name: 'Активно' } }),
        EventStatus.findOne({ where: { name: 'Успешно пройдено' } }),
        EventStatus.findOne({ where: { name: 'Провалено' } })
      ]);
  
      // Основные запросы данных
      const [
        courses,
        activeEventsCount,
        completedEventsCount,
        newVolunteersCount,
        volunteerActivity,
        failedEventsByYear,
        newVolunteersByYear,
        eventsNeedVolunteersList
      ] = await Promise.all([
        // Список направлений
        Course.findAll({
          attributes: ['id', 'name'],
          order: [['name', 'ASC']]
        }),
        
        // Количество активных мероприятий
        Event.count({
          where: courseId ? { statusId: activeStatus.id, courseId } : { statusId: activeStatus.id }
        }),
        
        // Количество завершенных мероприятий за год
        (async () => {
          const currentYear = new Date().getFullYear();
          const where = {
            statusId: completedStatus.id,
            [Op.or]: [
              Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "startDate"')), currentYear),
              Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "endDate"')), currentYear)
            ]
          };
          if (courseId) where.courseId = courseId;
          return Event.count({ where });
        })(),
        
        // Количество новых волонтеров
        User.count({
          where: Sequelize.where(
            Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "regDate"')), 
            new Date().getFullYear()
          )
        }),
        
        // Активность волонтеров по месяцам
        (async () => {
          const where = {};
          if (courseId) {
            where['$Event.courseId$'] = courseId;
          }
          
          return Activity.findAll({
            attributes: [
              [Sequelize.fn('TO_CHAR', Sequelize.col('Activity.Datetime'), 'Month'), 'month'],
              [Sequelize.fn('COUNT', Sequelize.col('Activity.Datetime')), 'count']
            ],
            include: [{
              model: Event,
              attributes: [],
              where
            }],
            group: ['month'],
            raw: true
          });
        })(),
        
        // Проваленные мероприятия по годам
        (async () => {
          const where = { statusId: failedStatus.id };
          if (courseId) where.courseId = courseId;
          
          return Event.findAll({
            attributes: [
              [Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "endDate"')), 'year'],
              [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            where,
            group: ['year'],
            order: [['year', 'ASC']],
            raw: true
          });
        })(),
        
        // Новые волонтеры по годам
        User.findAll({
          attributes: [
            [Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "regDate"')), 'year'],
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
          ],
          group: ['year'],
          order: [['year', 'ASC']],
          raw: true
        }),
        
        // Мероприятия, нуждающиеся в волонтерах
        (async () => {
          const events = await Event.findAll({
            where: courseId ? { statusId: activeStatus.id, courseId } : { statusId: activeStatus.id },
            include: [{
              model: Activity,
              required: false
            }]
          });
          
          return events.filter(event => {
            const volunteersCount = event.Activities ? event.Activities.length : 0;
            return event.needs > volunteersCount;
          });
        })()
      ]);
  
      // Формируем ответ
      const response = {
        courses,
        activeEvents: activeEventsCount,
        completedEvents: completedEventsCount,
        newVolunteers: newVolunteersCount,
        volunteerActivity,
        failedEvents: failedEventsByYear,
        newVolunteersByYear,
        eventsNeedVolunteers: eventsNeedVolunteersList,
        // Количество мероприятий без волонтеров вычисляем из уже полученных данных
        eventsWithoutVolunteers: eventsNeedVolunteersList.length
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error in /dashboard-data:', error);
      res.status(500).json({ error: error.message });
    }
  });
  


module.exports = router;