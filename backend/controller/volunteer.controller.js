const db = require('../db.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {Volunteer, City} = require('../models');
const ApiError = require('../error/api_error');

class VolunteerController {
    async create(req, res, next) {
        try {
            const volunteerData = req.body;
            const volunteer = await Volunteer.create(volunteerData);
            return res.json(volunteer);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async get(req, res, next) {
        try {
            const volunteers = await Volunteer.findAll({
                include: [{model: City}]
            });
            return res.json(volunteers);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async find(req, res, next) {
        try {
            const {id} = req.params;
            const volunteer = await Volunteer.findOne({
                where: {id},
                include: [{model: City}]
            });
            if (!volunteer) {
                return next(ApiError.badRequest('Volunteer not found'));
            }
            return res.json(volunteer);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const volunteer = await Volunteer.findByPk(id);
            if (!volunteer) {
                return next(ApiError.badRequest('Volunteer not found'));
            }
            await volunteer.update(req.body);
            return res.json(volunteer);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const volunteer = await Volunteer.findByPk(id);
            if (!volunteer) {
                return next(ApiError.badRequest('Volunteer not found'));
            }
            await volunteer.destroy();
            return res.json({message: 'Volunteer deleted'});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async check(req, res) {
        res.json("It's volunteer!")
    }
}

module.exports = new VolunteerController()