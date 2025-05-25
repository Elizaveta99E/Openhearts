const jwt = require('jsonwebtoken');
const ApiError = require('../error/api_error');
const { User, Staff, Volunteer } = require('../models');

// Основная middleware для проверки аутентификации
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(ApiError.unauthorized('Требуется авторизация'));
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test_secret_key');

        // Получаем актуальные данные пользователя
        const user = await User.findByPk(decoded.id, {
            include: [
                { model: Staff, required: false },
                { model: Volunteer, required: false }
            ]
        });

        if (!user) {
            return next(ApiError.unauthorized('Пользователь не найден'));
        }

        req.user = {
            id: user.id,
            email: decoded.email,
            role: user.staffId ? 'staff' : 'volunteer',
            staffId: user.staffId,
            volunteerId: user.volunteerId,
            name: user.staffId ? user.Staff.name : user.Volunteer.name
        };

        next();
    } catch (e) {
        return next(ApiError.unauthorized('Ошибка авторизации'));
    }
};

// Middleware для проверки ролей
const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        if (!requiredRoles.includes(req.user.role)) {
            return next(ApiError.forbidden('Доступ запрещен'));
        }
        next();
    };
};

module.exports = {
    authMiddleware,
    roleMiddleware
};