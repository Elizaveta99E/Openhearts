const bcrypt = require('bcryptjs')
const {Staff, StaffRole} = require('../models');
const ApiError = require('../error/api_error');


class StaffController {
    async create(req, res, next) {
        try {
            const {name, mail, phone, regDate, birthday, photo, staffRoleId, password} = req.body;
            const hashPassword = await bcrypt.hash(password, 5);

            const staff = await Staff.create({
                name,
                mail,
                phone,
                regDate,
                birthday,
                photo,
                staffRoleId,
                password: hashPassword
            });

            return res.json(staff);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async get(req, res, next) {
        try {
            const staffs = await Staff.findAll({
                include: [{model: StaffRole}]
            });
            return res.json(staffs);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async find(req, res, next) {
        try {
            const {id} = req.params;
            const staff = await Staff.findOne({
                where: {id},
                include: [{model: StaffRole}]
            });
            if (!staff) {
                return next(ApiError.badRequest('Staff not found'));
            }
            return res.json(staff);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const staff = await Staff.findByPk(id);
            if (!staff) {
                return next(ApiError.badRequest('Staff not found'));
            }
            await staff.update(req.body);
            return res.json(staff);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const staff = await Staff.findByPk(id);
            if (!staff) {
                return next(ApiError.badRequest('Staff not found'));
            }
            await staff.destroy();
            return res.json({message: 'Staff deleted'});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async check(req, res) {
        res.json("It's staff!")
    }
}
module.exports = new StaffController()