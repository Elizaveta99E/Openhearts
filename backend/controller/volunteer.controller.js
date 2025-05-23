const db = require('../db.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {Volunteer, City, User, sequelize} = require('../models');
const ApiError = require('../error/api_error');

class VolunteerController {
    async create(req, res, next) {
        try {
            const volunteerData = req.body;

            if (!volunteerData.name || !volunteerData.mail || !volunteerData.password) {
                return next(ApiError.badRequest('Имя, почта и пароль обязательны'));
            }

            const hashPassword = await bcrypt.hash(volunteerData.password, 5);
            const currentDate = new Date().toISOString().split('T')[0];

            // Удаляем пароль из данных волонтера
            delete volunteerData.password;

            // Создаем волонтера
            const volunteer = await Volunteer.create({
                ...volunteerData,
                regDate: volunteerData.regDate || currentDate
            });

            // Создаем пользователя
            const user = await User.create({
                hash: hashPassword,
                regDate: currentDate,
                volunteerId: volunteer.id
            });

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

            // Находим и удаляем связанного пользователя
            const user = await User.findOne({ where: { volunteerId: id } });
            if (user) {
                await user.destroy();
            }

            return res.json({message: 'Volunteer deleted'});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async changePassword(req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;
            // Ищем пользователя по ID из токена
            const user = await User.findByPk(req.volunteerId, {
                include: [Volunteer] // Включаем связь с волонтёром
            });

            // Проверяем существование пользователя и привязку к волонтёру
            if (!user || !user.Volunteer) {
                return next(ApiError.badRequest('Волонтёр не найден'));
            }

            // Проверка старого пароля
            const isValid = bcrypt.compareSync(oldPassword, user.hash);
            if (!isValid) {
                return next(ApiError.badRequest('Неверный текущий пароль'));
            }

            // Обновление пароля
            const hashPassword = await bcrypt.hash(newPassword, 5);
            await user.update({ hash: hashPassword });

            return res.json({ message: 'Пароль волонтёра изменён' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async check(req, res) {
        res.json("It's volunteer!")
    }
}

module.exports = new VolunteerController()