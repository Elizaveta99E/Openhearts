const jwt = require('jsonwebtoken');
const ApiError = require('../error/api_error');
const {User, Staff, Volunteer} = require('../models');

module.exports = function (role) {
    return async function (req, res, next) {
        if (req.method === 'OPTIONS') {
            return next();
        }
        try {
            const token = req.cookies.token;
            if (!token) {
                return next(ApiError.unauthorized('Не авторизован'));
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test_secret_key');

            const user = await User.findByPk(decoded.id, {
                include: [
                    {model: Staff, required: false},
                    {model: Volunteer, required: false}
                ]
            });

            if (!user) {
                return next(ApiError.unauthorized('Пользователь не найден'));
            }

            if (role && role !== (user.staffId ? 'staff' : 'volunteer')) {
                return next(ApiError.forbidden('Нет доступа'));
            }

            req.user = {
                id: user.id,
                email: decoded.email,
                role: user.staffId ? 'staff' : 'volunteer',
                staffId: user.staffId,
                volunteerId: user.volunteerId
            };

            next();
        } catch (e) {
            return next(ApiError.unauthorized('Не авторизован'));
        }
    }
}

module.exports = function (req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(ApiError.unauthorized('Требуется авторизация'));
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test_secret_key');
        req.user = decoded;
        next();
    } catch (e) {
        return next(ApiError.unauthorized('Ошибка авторизации'));
    }
};

module.exports = function(role) {
    return function(req, res, next) {
        if (req.user.role !== role) {
            return next(ApiError.forbidden('Доступ запрещён'));
        }
        next();
    }
}