const db = require('../db.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {Volunteers, Cities, VolunteersStatus} = require('../models');
const ApiError = require('../error/api_error');

class VolunteerController{

    async get(req,res, next){
        try {
            const volunteers = await Volunteers.findAll({
                include: [
                    {model: Cities},
                    {model: VolunteersStatus}
                ]
            });
            return res.json(volunteers);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async find(req, res, next) {
        try {
            const {id} = req.query;
            const volunteer = await Volunteers.findByPk(id, {
                include: [
                    {model: Cities},
                    {model: VolunteersStatus}
                ]
            });
            if (!volunteer) {
                return next(ApiError.badRequest('Волонтер не найден'));
            }
            return res.json(volunteer);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id, ...data} = req.body;
            if (!id) return next(ApiError.badRequest('Не указан ID'));

            if (data.Password) {
                data.Password = await bcrypt.hash(data.Password, 5);
            }

            const updated = await Volunteers.update(data, {
                where: {id},
                returning: true
            });
            return res.json(updated[1][0]);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.query;
            await Volunteers.destroy({where: {id}});
            return res.json({message: 'Волонтер удален'});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

}
module.exports = new VolunteerController()