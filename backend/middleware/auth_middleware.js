const jwt = require('jsonwebtoken');
const ApiError = require('../error/api_error');

module.exports = function(requiredRole) {
    return function (req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test_secret_key');

            if(requiredRole !== 'ALL' && decoded.role !== requiredRole) {
                return next(ApiError.forbidden('Нет доступа'));
            }

            req.user = decoded;
            next();
        } catch(e) {
            next(ApiError.unauthorized('Не авторизован'));
        }
    }
}