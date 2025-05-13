const db = require('../db.js')
const bcrypt = require('bcryptjs')
const {Staff, StaffRoles} = require('../models');
const ApiError = require('../error/api_error');
const jwt = require('jsonwebtoken');

class StaffController{

    async create(req, res, next) {
        try {
            const {Name, Mail, Password, Phone, Birthday, Role} = req.body;

            // Проверка существования email
            const candidate = await Staff.findOne({ where: { Mail } });
            if(candidate) {
                return next(ApiError.badRequest('Сотрудник с таким email уже существует'));
            }

            // Хеширование пароля
            const hashPassword = await bcrypt.hash(Password, 10);

            // Создание сотрудника
            const staff = await Staff.create({
                Name,
                Mail,
                Password: hashPassword, // Используем хешированный пароль
                Phone,
                Birthday,
                Role,
                RegDate: new Date()
            });

            // Генерация JWT (опционально, если требуется сразу выдать токен)
            const token = jwt.sign(
                {id: staff.id, email: Mail, role: 'staff'},
                process.env.SECRET_KEY,
                {expiresIn: '24h'}
            );

            return res.json({...staff.toJSON(), token}); // Возвращаем токен в ответе

        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async get(req, res, next) {
        try {
            const staffs = await Staff.findAll({
                include: [{model: StaffRoles}]
            });
            return res.json(staffs);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async find(req, res, next) {
        try {
            const {id} = req.query;
            const staff = await Staff.findByPk(id, {
                include: [{model: StaffRoles}]
            });
            if (!staff) {
                return next(ApiError.badRequest('Сотрудник не найден'));
            }
            return res.json(staff);
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

            const updated = await Staff.update(data, {
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
            await Staff.destroy({where: {id}});
            return res.json({message: 'Сотрудник удален'});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

}
module.exports = new StaffController()