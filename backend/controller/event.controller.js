const ApiError = require('../error/api_error')
const {Event, Staff, City, Course, Format, EventStatus, Condition, Peculiarity} = require('../models');

class EventController {
    async create(req, res, next) {
        try {
            const eventData = req.body;
            const event = await Event.create(eventData);

            // Добавление связей многие-ко-многим
            if (eventData.conditions) {
                await event.addConditions(eventData.conditions);
            }
            if (eventData.peculiarities) {
                await event.addPeculiarities(eventData.peculiarities);
            }

            return res.json(event);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const events = await Event.findAll({
                include: [
                    {model: Staff},
                    {model: City},
                    {model: Course},
                    {model: Format},
                    {model: EventStatus},
                    {model: Condition},
                    {model: Peculiarity}
                ]
            });
            return res.json(events);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async find(req, res, next) {
        exports.find = async (req, res) => {
            try {
                const event = await Event.findByPk(req.params.id, {
                    include: [
                        { model: City },
                        { model: Staff },
                        { model: Format },
                        { model: Condition }
                    ]
                });

                res.render('event', {
                    event: event.toJSON(),
                    user: req.user // Передаем данные пользователя из сессии
                });
            } catch (e) {
                res.status(500).json({ message: 'Ошибка получения данных' });
            }
        };
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const event = await Event.findByPk(id);
            if (!event) {
                return next(ApiError.badRequest('Event not found'));
            }

            await event.update(req.body);

            // Обновление связей
            if (req.body.conditions) {
                await event.setConditions(req.body.conditions);
            }
            if (req.body.peculiarities) {
                await event.setPeculiarities(req.body.peculiarities);
            }

            return res.json(event);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const event = await Event.findByPk(id);
            if (!event) {
                return next(ApiError.badRequest('Event not found'));
            }
            await event.destroy();
            return res.json({message: 'Event deleted'});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async check(req, res) {
        try {
            const course = await Event.findAll();
            res.json(course);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }

}

module.exports = new EventController()