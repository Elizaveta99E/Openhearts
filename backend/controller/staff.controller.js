const db = require('../db.js')
const bcrypt = require('bcryptjs')
const {Staff, StaffRoles} = require('../models');
const ApiError = require('../error/api_error');
const jwt = require('jsonwebtoken');

class StaffController{

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

    async registration(req, res, next) {
        try {
            const { Name, Mail, Password, RoleId } = req.body;

            // Проверка существования роли
            const role = await StaffRoles.findByPk(RoleId);
            if (!role) {
                return next(ApiError.badRequest("Роль не найдена"));
            }

            // Проверка уникальности почты
            const candidate = await Staff.findOne({ where: { Mail } });
            if (candidate) {
                return next(ApiError.badRequest("Пользователь уже существует"));
            }

            // Хеширование пароля
            const hashPassword = await bcrypt.hash(Password, 5);

            // Создание сотрудника
            const staff = await Staff.create({
                Name,
                Mail,
                Password: hashPassword,
                Role: RoleId, // Убедитесь, что поле называется именно так
                RegDate: new Date().toISOString().split("T")[0]
            });

            // Генерация токена
            const token = generateJwt(staff.id, RoleId);
            return res.json({ token });

        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const {Mail, Password} = req.body;
            const staff = await Staff.findOne({where: {Mail}});
            if (!staff) {
                return next(ApiError.internal('Пользователь не найден'));
            }

            let comparePassword = bcrypt.compareSync(Password, staff.Password);
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'));
            }

            const token = generateJwt(staff.id, staff.Role);
            return res.json({token});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.role);
        return res.json({token});
    }
}
module.exports = new StaffController()