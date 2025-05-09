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

    async registration(req, res, next) {
        try {
            const { Name, Mail, Password, CityId } = req.body;

            // Проверка существования города
            const city = await Cities.findByPk(CityId);
            if (!city) {
                return next(ApiError.badRequest("Город не найден"));
            }

            // Проверка существования статуса (если передается)
            if (StatusId) {
                const status = await VolunteersStatus.findByPk(StatusId);
                if (!status) {
                    return next(ApiError.badRequest("Статус не найден"));
                }
            }

            // Проверка уникальности почты
            const candidate = await Volunteers.findOne({ where: { Mail } });
            if (candidate) {
                return next(ApiError.badRequest("Пользователь уже существует"));
            }

            // Хеширование пароля
            const hashPassword = await bcrypt.hash(Password, 5);

            // Создание волонтера
            const volunteer = await Volunteers.create({
                Name,
                Mail,
                Password: hashPassword,
                Cities: CityId, // Название поля должно совпадать с моделью
                Status: 1,      // Статус "Активен" по умолчанию
                RegDate: new Date().toISOString().split("T")[0]
            });

            // Генерация токена
            const token = generateJwt(volunteer.id);
            return res.json({ token });

        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const {Mail, Password} = req.body;
            const volunteer = await Volunteers.findOne({where: {Mail}});
            if (!volunteer) {
                return next(ApiError.internal('Пользователь не найден'));
            }

            let comparePassword = bcrypt.compareSync(Password, volunteer.Password);
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'));
            }

            const token = generateJwt(volunteer.id);
            return res.json({token});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id);
        return res.json({token});
    }
}
module.exports = new VolunteerController()