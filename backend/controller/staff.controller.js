const bcrypt = require('bcryptjs')
const {Staff, StaffRole, User} = require('../models');
const ApiError = require('../error/api_error');


class StaffController {
    async create(req, res, next) {
        try {
            const {name, mail, phone, regDate, birthday, photo, staffRoleId, password} = req.body;

            if (!name || !mail || !password) {
                return next(ApiError.badRequest('Имя, почта и пароль обязательны'));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const currentDate = new Date().toISOString().split('T')[0];

            // Создаем сотрудника
            const staff = await Staff.create({
                name,
                mail,
                phone,
                regDate: regDate || currentDate,
                birthday,
                photo,
                staffRoleId
            });

            // Создаем пользователя
            const user = await User.create({
                hash: hashPassword,
                regDate: currentDate,
                staffId: staff.id
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

            // Находим и удаляем связанного пользователя
            const user = await User.findOne({ where: { staffId: id } });
            if (user) {
                await user.destroy();
            }

            return res.json({message: 'Staff deleted'});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async changePassword(req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = await User.findOne({
                where: { staffId: req.user.id },
                include: [Staff]
            });

            if (!user || !user.Staff) {
                return next(ApiError.badRequest('Сотрудник не найден'));
            }

            const isValid = bcrypt.compareSync(oldPassword, user.hash);
            if (!isValid) {
                return next(ApiError.badRequest('Неверный текущий пароль'));
            }

            const hashPassword = await bcrypt.hash(newPassword, 5);
            await user.update({ hash: hashPassword });

            return res.json({ message: 'Пароль сотрудника изменён' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async changePassword(req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;
            // Ищем пользователя по ID из токена
            const user = await User.findByPk(req.staffId, {
                include: [Staff] // Включаем связь с сотрудником
            });

            // Проверяем существование пользователя и привязку к сотруднику
            if (!user || !user.Staff) {
                return next(ApiError.badRequest('Сотрудник не найден'));
            }

            // Проверка старого пароля
            const isValid = bcrypt.compareSync(oldPassword, user.hash);
            if (!isValid) {
                return next(ApiError.badRequest('Неверный текущий пароль'));
            }

            // Обновление пароля
            const hashPassword = await bcrypt.hash(newPassword, 5);
            await user.update({ hash: hashPassword });

            return res.json({ message: 'Пароль сотрудника изменён' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async check(req, res) {
        res.json("It's staff!")
    }
}
module.exports = new StaffController()