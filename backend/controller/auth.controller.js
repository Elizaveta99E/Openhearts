const { Staff, Volunteer, User, sequelize } = require('../models');
const { Op } = require('sequelize');
const ApiError = require('../error/api_error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//генерируется токен (role - волонтер или сотрудник)
const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY || 'test_secret_key',
        { expiresIn: '24h' }
    );
};

const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
};

class AuthController {
    //функция регистрации
    async registration(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { name, mail, phone, birthday, cityId, password } = req.body;

            if (!mail || !password || !name) {
                return next(ApiError.badRequest('Неверные email, имя или пароль'));
            }

            const existingUser = await User.findOne({ where: { mail } });
            if (existingUser) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const regDate = new Date().toISOString().split('T')[0];

            const volunteer = await Volunteer.create({
                name,
                phone,
                regDate,
                birthday,
                cityId
            }, { transaction: t });

            const user = await User.create({
                mail,
                hash: hashPassword,
                regDate,
                volunteerId: volunteer.id
            }, { transaction: t });

            await t.commit();

            const token = generateJwt(user.id, mail, 'volunteer');
            setTokenCookie(res, token);

            return res.json({ message: 'Регистрация успешна' });
        } catch (e) {
            await t.rollback();
            return next(ApiError.badRequest(e.message || 'Ошибка регистрации'));
        }
    }
//функция входа
    async login(req, res, next) {
        try {
            const { mail, password } = req.body;

            if (!mail || !password) {
                return next(ApiError.badRequest('Неверный email или пароль'));
            }

            const user = await User.findOne({
                include: [
                    { model: Volunteer, required: false },
                    { model: Staff, required: false }
                ],
                where: { mail }
            });

            if (!user) {
                return next(ApiError.badRequest('Неверный email или пароль'));
            }

            const isPasswordValid = await bcrypt.compare(password, user.hash);
            if (!isPasswordValid) {
                return next(ApiError.badRequest('Неверный email или пароль'));
            }

            const role = user.staffId ? 'staff' : 'volunteer';
            const token = generateJwt(user.id, user.mail, role);
            setTokenCookie(res, token);

            return res.json({ message: 'Вход выполнен успешно', role });
        } catch (e) {
            return next(ApiError.internal(e.message || 'Ошибка входа'));
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('token');
            
            // Для API-запросов (AJAX/fetch)
            if (req.xhr || req.headers.accept.indexOf('json') > -1) {
                return res.json({ success: true, redirect: '/' });
            }
            
            // Для обычных запросов
            return res.redirect('/');
        } catch (e) {
            console.error('Logout error:', e);
            return res.redirect('/');
        }
    }

    async check(req, res) {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ auth: false });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test_secret_key');

            // Можно обновить токен тут (по желанию)
            const newToken = generateJwt(decoded.id, decoded.email, decoded.role);
            setTokenCookie(res, newToken);

            return res.json({
                auth: true,
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            });
        } catch (e) {
            res.clearCookie('token');
            return res.json({ auth: false });
        }
    }
}

module.exports = new AuthController();
