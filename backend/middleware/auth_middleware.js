const jwt = require('jsonwebtoken');
const ApiError = require('../error/api_error');
const { User, Staff, Volunteer } = require('../models');

/**
 * Основная middleware для проверки аутентификации
 * Добавляет user в res.locals для использования в шаблонах
 */
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        // Базовый объект пользователя по умолчанию
        res.locals.user = { isAuth: false };
        
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test_secret_key');
            
            // Получаем пользователя с минимально необходимыми данными
            const user = await User.findOne({
                where: { id: decoded.id },
                include: [
                    { 
                        model: Staff, 
                        required: false,
                        attributes: ['name', 'photo'] 
                    },
                    { 
                        model: Volunteer, 
                        required: false,
                        attributes: ['name', 'photo', 'cityId'] 
                    }
                ],
                attributes: ['id', 'mail', 'staffId', 'volunteerId']
            });

            if (user) {
                // Формируем полные данные пользователя
                const userData = {
                    isAuth: true,
                    id: user.id,
                    email: user.mail,
                    role: user.staffId ? 'staff' : 'volunteer',
                    name: user.staffId ? user.Staff.name : user.Volunteer.name,
                    photo: user.staffId ? user.Staff.photo : user.Volunteer.photo
                };

                // Для волонтеров добавляем cityId
                if (user.volunteerId) {
                    userData.cityId = user.Volunteer.cityId;
                }

                res.locals.user = userData;
                req.user = userData; // Для использования в роутах
            }
        }
        
        next();
    } catch (e) {
        console.error('Auth error:', e.message);
        res.locals.user = { isAuth: false };
        next();
    }
};

/**
 * Middleware для проверки ролей
 */
const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        if (!res.locals.user.isAuth) {
            return next(ApiError.unauthorized('Требуется авторизация'));
        }

        if (!requiredRoles.includes(res.locals.user.role)) {
            return next(ApiError.forbidden('Доступ запрещен'));
        }

        next();
    };
};

module.exports = {
    authMiddleware,
    roleMiddleware
};