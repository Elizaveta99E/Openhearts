const db = require('../db.js')
const ApiError = require('../error/api_error')

class StaffController{
    async create(req,res){
    }

    async get(req,res){
    }

    async update(req,res){
    }

    async delete(req,res){
    }

    async registration(req,res){
    }

    async login(req,res){
    }

  async check(req, res, next){
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Stupid people'))
      }
      res.json(id)
  }
}
module.exports = new StaffController()