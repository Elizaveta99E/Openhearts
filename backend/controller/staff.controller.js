const db = require('../db.js')
class StaffController{
    async createStaff(req,res){
        const {Mail, Name, Phone, Regdate, Birthday, StaffRole, Photo}=req.body
        const newSfaff = await db.query(`INSERT INTO Staff (Mail, Name, Phone, Regdate, Birthday, StaffRole, Photo) 
            values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
            [Mail, Name, Phone, Regdate, Birthday, StaffRole, Photo])
        res.json(newSfaff.rows[0])
    }

    async getStaff(req,res){
        const users = await db.query('SELECT * FROM Staff')
        res.json(users.rows)
    }

    async getOneStaff(req,res){
        const Id = req.params.id
        const user = await db.query('SELECT * FROM Staff where Id = $1',[Id])
        res.json(user.rows[0])
    }

    async updateStaff(req,res){
        const {Id, Mail, Name, Phone, Regdate, Birthday, StaffRole, Photo} = req.body
        const user = await db.query('UPDATE Staff set Mail = $1 Name = $2, Phone = $3, Regdate = $4, Birthday = $5, StaffRole = $6, Photo = $7 where Id = $8 RETURNING *', 
            [Mail, Name, Phone, Regdate, Birthday, StaffRole, Photo, Id])
        res.json(user.rows[0])
    }
    
    async deleteStaff(req,res){
        const Id = req.params.id
        const user = await db.query('DELETE * FROM Staff where Id = $1',[Id])
        res.json(user.rows[0])
    }
}
module.exports = new StaffController()