const db = require('../db.js')
class EventController{
    async create(req,res){
    }

    async get(req,res){
    }

    async update(req,res){
    }

    async delete(req,res){
    }


    async check(req,res){
        res.json('Hello!')
    }
}
module.exports = new EventController()