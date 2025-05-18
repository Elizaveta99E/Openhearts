const db =require('../db')
class PeculiaritiesController {
    async createPeculiarities(req, res, next){
       
            const { Name} = req.body;
            const newPeculiarity = await db.query('INSERT INTO Peculiarities (Name) values ($1) RETURNING *', [Name]);
            return res.json(newPeculiarity.rows[0])
       
    }
    async getPeculiarities(req, res){
        const Peculiarities = await db.query('SELECT * FROM Peculiarities')
        res.json(newPeculiarity)
    }
    async getOnePeculiarities(req, res){}
    async updatePeculiarities(req, res){}
    async deletePeculiarities(req, res){}
}
module.exports = new PeculiaritiesController()