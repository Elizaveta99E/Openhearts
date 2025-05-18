const {Staff, Volunteer, User} = require('../models');
const { Op } = require('sequelize');
const ApiError = require('../error/api_error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY || 'test_secret_key',
        {expiresIn: '24h'}
    );
}

class AuthController {

    async registration(req, res, next) {
        try {
            const {name, mail, phone, birthday, cityId, comment, password, photo} = req.body;

            if (!mail || !password || !name) {
                return next(ApiError.badRequest('Некорректные email, имя или пароль'));
            }

            const candidate = await User.findOne({
                include: [
                    {model: Volunteer, where: {mail}},
                    {model: Staff, where: {mail}}
                ],
                where: {}
            });

            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const regDate = new Date().toISOString().split('T')[0];

            const volunteer = await Volunteer.create({
                name,
                mail,
                phone,
                regDate,
                birthday,
                cityId,
                comment,
                photo
            });

            const user = await User.create({
                hash: hashPassword,
                regDate,
                volunteerId: volunteer.id
            });

            const token = generateJwt(user.id, mail, 'volunteer');

            // Устанавливаем cookie
            res.cookie('token', token, {
                maxAge: 24 * 60 * 60 * 1000, // 24 часа
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // В production используем secure
                sameSite: 'strict'
            });

            return res.json({message: 'Регистрация успешна'});

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const {mail, password} = req.body;
            if (!mail || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'));
            }

            const user = await User.findOne({
                include: [
                    {
                        model: Volunteer,
                        where: { mail },
                        required: false
                    },
                    {
                        model: Staff,
                        where: { mail },
                        required: false
                    }
                ],
                where: {
                    [Op.or]: [
                        { '$Volunteer.mail$': mail },
                        { '$Staff.mail$': mail }
                    ]
                }
            });

            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            let comparePassword = bcrypt.compareSync(password, user.hash);
            if (!comparePassword) {
                return next(ApiError.badRequest('Указан неверный пароль'));
            }

            const role = user.staffId ? 'staff' : 'volunteer';
            const token = generateJwt(user.id, mail, role);

            // Устанавливаем cookie
            res.cookie('token', token, {
                maxAge: 24 * 60 * 60 * 1000, // 24 часа
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // В production используем secure
                sameSite: 'strict'
            });

            return res.json({message: 'Вход выполнен успешно', role});

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async logout(req, res) {
        res.clearCookie('token');
        return res.json({message: 'Выход выполнен успешно'});
    }

    async check(req, res) {
        const token = req.cookies.token;
        if (!token) {
            return res.json({auth: false});
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test_secret_key');
            return res.json({
                auth: true,
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            });
        } catch (e) {
            return res.json({auth: false});
        }
    }

}

module.exports = new AuthController();