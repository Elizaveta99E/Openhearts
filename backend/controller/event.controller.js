const db = require('../db.js')
const ApiError = require('../error/api_error')
const {Staff, Events, Cities, Format, EventsStatus, Course} = require('../models')

class EventController {
    async create(req, res, next) {
        try {
            const {
                Name,
                StartDate,
                EndDate,
                Description,
                Conditions,
                Peculiarities,
                Needs,
                Pic,
                Time,
                Place,
                CityId,
                FormatId,
                StatusId,
                CourseId,
                StaffId
            } = req.body;

            const event = await Events.create({
                Name,
                StartDate,
                EndDate,
                Description,
                Conditions,
                Peculiarities,
                Needs,
                Pic,
                Time,
                Place,
                Cities: CityId,
                Formates: FormatId,
                Status: StatusId,
                Courses: CourseId,
                IdStaff: StaffId
            });

            return res.json(event);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const events = await Events.findAll({
                include: [
                    {model: Cities},
                    {model: Format},
                    {model: EventsStatus},
                    {model: Course},
                    {model: Staff}
                ]
            });
            return res.json(events);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async find(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) return next(ApiError.badRequest('Не указан ID'));

            const event = await Events.findOne({
                where: {id},
                include: [
                    {model: Events}
                ]});

            return res.json(event);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id, ...data} = req.body;
            if (!id) return next(ApiError.badRequest('Не указан ID'));

            const updatedEvent = await Events.update(data, {
                where: {id},
                returning: true
            });

            return res.json(updatedEvent[1][0]);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.query;
            if (!id) return next(ApiError.badRequest('Не указан ID'));

            await Events.destroy({where: {id}});
            return res.json({message: 'Мероприятие удалено'});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async check(req, res) {
        res.json('Event controller works!');
    }
}

module.exports = new EventController()