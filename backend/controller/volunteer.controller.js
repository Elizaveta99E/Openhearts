const db = require('../db.js')
class VolunteerController{
    async create(req,res){
    }

    async get(req,res){
    }



    async update(req,res){
    }

    async delete(req,res){
    }

    async registration(req,res){
        const {email, password} = req.body
        if(!email || !password) {
            return 0
        }
    }

    async login(req,res){

    }

    async check(req,res){
        res.json('Hello!')
    }
}
module.exports = new VolunteerController()