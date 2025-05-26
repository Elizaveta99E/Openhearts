const ApiError = require('../error/api_error');
const {Event, Staff, City, Course, Format, EventStatus, Condition, Peculiarity, sequelize} = require('../models');
const { ConditionsOfEvents, PeculiaritiesOfEvents} = require('../models');
const { Op } = require('sequelize');

class EventController {
    async create(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const eventData = req.body;

            // Создаем мероприятие
            const event = await Event.create({
                name: eventData.name,
                startDate: eventData.startDate,
                endDate: eventData.endDate,
                description: eventData.description,
                needs: eventData.needs,
                pic: eventData.pic,
                time: eventData.time,
                place: eventData.place,
                staffId: eventData.staffId,
                courseId: eventData.courseId,
                cityId: eventData.cityId,
                formatId: eventData.formatId,
                statusId: eventData.statusId || 1 // Дефолтный статус, если не указан
            }, { transaction });

            // Обрабатываем условия
            if (eventData.conditions && eventData.conditions.length > 0) {
                const conditions = await Condition.findAll({
                    where: { id: eventData.conditions },
                    transaction
                });
                await event.setConditions(conditions, { transaction });
            }

            // Обрабатываем особенности
            if (eventData.peculiarities && eventData.peculiarities.length > 0) {
                const peculiarities = await Peculiarity.findAll({
                    where: { id: eventData.peculiarities },
                    transaction
                });
                await event.setPeculiarities(peculiarities, { transaction });
            }

            await transaction.commit();

            // Получаем полные данные созданного события
            const createdEvent = await Event.findByPk(event.id, {
                include: [
                    {model: Staff},
                    {model: City},
                    {model: Course},
                    {model: Format},
                    {model: EventStatus},
                    {model: Condition, through: { attributes: [] }},
                    {model: Peculiarity, through: { attributes: [] }}
                ]
            });

            return res.status(201).json(createdEvent);
        } catch (e) {
            await transaction.rollback();
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;

            // Находим мероприятие с учетом транзакции
            const event = await Event.findByPk(id, { transaction });

            if (!event) {
                await transaction.rollback();
                return next(ApiError.notFound('Мероприятие не найдено'));
            }

            // Удаляем связи многие-ко-многим перед удалением самого мероприятия
            await ConditionsOfEvents.destroy({
                where: { IdEvent: id },
                transaction
            });

            await PeculiaritiesOfEvents.destroy({
                where: { IdEvent: id },
                transaction
            });

            // Удаляем само мероприятие
            await event.destroy({ transaction });

            // Фиксируем транзакцию
            await transaction.commit();

            return res.json({ message: 'Мероприятие успешно удалено' });
        } catch (e) {
            await transaction.rollback();
            next(ApiError.internal(e.message));
        }
    }

    async updateStatus(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const {id} = req.params;
            const {statusId} = req.body;

            if (isNaN(id)) {
                throw ApiError.badRequest('Invalid event ID');
            }

            if (!statusId || isNaN(statusId)) {
                throw ApiError.badRequest('Valid status ID is required');
            }

            const event = await Event.findByPk(id, { transaction });
            if (!event) {
                throw ApiError.notFound('Event not found');
            }

            const status = await EventStatus.findByPk(statusId, { transaction });
            if (!status) {
                throw ApiError.notFound('Status not found');
            }

            await event.update({ statusId }, { transaction });

            await transaction.commit();

            // Возвращаем обновленное мероприятие
            const updatedEvent = await Event.findByPk(id, {
                include: [
                    {model: EventStatus}
                ]
            });

            return res.json({
                success: true,
                message: 'Event status updated successfully',
                event: updatedEvent
            });
        } catch (error) {
            await transaction.rollback();

            if (error instanceof ApiError) {
                return next(error);
            }

            // Обработка ошибок валидации
            if (error.name === 'SequelizeValidationError') {
                return next(ApiError.badRequest(error.errors.map(e => e.message).join(', ')));
            }

            return next(ApiError.internal('Failed to update event status'));
        }
    }

    // async getAll(req, res, next) {
    //     try {
    //         const events = await Event.findAll({
    //             include: [
    //                 {model: Staff},
    //                 {model: City},
    //                 {model: Course},
    //                 {model: Format},
    //                 {model: EventStatus},
    //                 {model: Condition, through: { attributes: [] }},
    //                 {model: Peculiarity, through: { attributes: [] }}
    //             ],
    //             order: [['startDate', 'DESC']]
    //         });
    //         return res.json(events);
    //     } catch (e) {
    //         next(ApiError.internal(e.message));
    //     }
    // }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const event = await Event.findByPk(id, {
                include: [
                    {model: Staff},
                    {model: City},
                    {model: Course},
                    {model: Format},
                    {model: EventStatus},
                    {model: Condition, through: { attributes: [] }},
                    {model: Peculiarity, through: { attributes: [] }}
                ]
            });

            if (!event) {
                return next(ApiError.notFound('Event not found'));
            }

            return res.json(event);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async update(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const {id} = req.params;
            const event = await Event.findByPk(id, { transaction });

            if (!event) {
                await transaction.rollback();
                return next(ApiError.notFound('Event not found'));
            }

            await event.update(req.body, { transaction });

            // Обновление условий мероприятия
            if (req.body.conditions) {
                // Удаляем старые связи
                await ConditionsOfEvents.destroy({
                    where: { IdEvent: id },
                    transaction
                });

                // Добавляем новые связи
                if (req.body.conditions.length > 0) {
                    const conditionsRecords = req.body.conditions.map(conditionId => ({
                        IdEvent: id,
                        IdConditions: conditionId
                    }));
                    await ConditionsOfEvents.bulkCreate(conditionsRecords, { transaction });
                }
            }

            // Обновление особенностей мероприятия
            if (req.body.peculiarities) {
                // Удаляем старые связи
                await PeculiaritiesOfEvents.destroy({
                    where: { IdEvent: id },
                    transaction
                });

                // Добавляем новые связи
                if (req.body.peculiarities.length > 0) {
                    const peculiaritiesRecords = req.body.peculiarities.map(peculiarityId => ({
                        IdEvent: id,
                        IdPeculiarities: peculiarityId
                    }));
                    await PeculiaritiesOfEvents.bulkCreate(peculiaritiesRecords, { transaction });
                }
            }

            await transaction.commit();

            // Получаем обновленные данные события
            const updatedEvent = await Event.findByPk(id, {
                include: [
                    {model: Staff},
                    {model: City},
                    {model: Course},
                    {model: Format},
                    {model: EventStatus},
                    {model: Condition, through: { attributes: [] }},
                    {model: Peculiarity, through: { attributes: [] }}
                ]
            });

            return res.json(updatedEvent);
        } catch (e) {
            await transaction.rollback();
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
          console.log('Fetching active events...');
      
          // Получаем только те события, у которых статус "Активно"
          const events = await Event.findAll({
            include: [
              {
                model: EventStatus,
                attributes: ['name'],
                where: { name: 'Активно' } // Фильтрация по статусу
              },
              { model: Course, attributes: ['name'], required: false },
              { model: City, attributes: ['name'], required: false },
              { model: Format, attributes: ['name'], required: false }
            ],
            order: [['name', 'ASC']]
          });
      
          console.log(`Fetched ${events.length} active events`);
      
          const [courses, formats, conditions, peculiarities] = await Promise.all([
            Course.findAll(),
            Format.findAll(),
            Condition.findAll(),
            Peculiarity.findAll()
          ]);
      
          res.render('events', {
            events: events || [],
            courses: courses || [],
            formats: formats || [],
            conditions: conditions || [],
            peculiarities: peculiarities || [],
            user: req.user || null
          });
      
        } catch (e) {
          console.error('Error in getAll:', e);
          next(ApiError.internal(e.message));
        }
      }
      
    async getFiltered(req, res, next) {
        try {
            const { 
                search, 
                courses, 
                formats, 
                conditions, 
                peculiarities, 
                sort, 
                perPage,
                page = 1
            } = req.query;
    
            const where = {};
            const include = [
                { model: Course, attributes: ['name'] },
                { model: City, attributes: ['name'] },
                { model: Format, attributes: ['name'] }
            ];
    
            // Поиск по названию
            if (search) {
                where.name = { [Op.iLike]: `%${search}%` };
            }
    
            // Фильтр по направлению (cursoes)
            if (courses && courses.length) {
                where.courseId = { [Op.in]: courses.split(',').map(Number) };
            }
    
            // Фильтр по форматам
            if (formats && formats.length) {
                where.formatId = { [Op.in]: formats.split(',').map(Number) };
            }
    
            // Фильтр по условиям
            if (conditions && conditions.length) {
                include.push({
                    model: Condition,
                    through: { attributes: [] },
                    where: { id: { [Op.in]: conditions.split(',').map(Number) } }
                });
            }
    
            // Фильтр по особенностям
            if (peculiarities && peculiarities.length) {
                include.push({
                    model: Peculiarity,
                    through: { attributes: [] },
                    where: { id: { [Op.in]: peculiarities.split(',').map(Number) } }
                });
            }
    
            // Сортировка
            let order;
            switch(sort) {
                case 'name-asc': order = [['name', 'ASC']]; break;
                case 'name-desc': order = [['name', 'DESC']]; break;
                case 'date-asc': order = [['startDate', 'ASC']]; break;
                case 'date-desc': order = [['startDate', 'DESC']]; break;
                default: order = [['name', 'ASC']];
            }
    
            // Пагинация
            const limit = perPage === 'all' ? null : parseInt(perPage) || 10;
            const offset = limit ? (parseInt(page) - 1) * limit : 0;
    
            const { count, rows: events } = await Event.findAndCountAll({
                where,
                include,
                order,
                limit,
                offset,
                distinct: true
            });
    
            const totalPages = limit ? Math.ceil(count / limit) : 1;
    
            res.json({
                events,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalItems: count
                }
            });
        } catch (e) {
            next(ApiError.internal(e.message));
        }

    }
}

module.exports = new EventController();