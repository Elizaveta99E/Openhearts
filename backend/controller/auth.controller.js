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
    async create(req, res, next) {

    }

    async get(req,res, next){

    }

    async find(req, res, next) {

    }

    async update(req, res, next) {

    }

    async delete(req, res, next) {

    }

    async registration(req, res, next) {

    }

    async login(req, res, next) {

    }


    async check(req, res, next) {

    }

}

module.exports = new AuthController();