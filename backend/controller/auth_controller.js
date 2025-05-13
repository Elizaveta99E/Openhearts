const {Staff, Volunteers} = require('../models');
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

    }

    async login(req, res, next) {

    }

}

module.exports = new AuthController();