const { Volunteer } = require('../models');

class VolunteerController {
    async getVolunteerProfile(req, res) {
        try {
            const volunteer = await Volunteer.findByPk(req.params.id);
            if (!volunteer) {
                return res.status(404).send('Волонтер не найден');
            }
            res.render('volunteer-account', { volunteer });
        } catch (error) {
            console.error(error);
            res.status(500).send('Ошибка сервера');
        }
    }

    async getEditVolunteerProfile(req, res) {
        try {
            const volunteer = await Volunteer.findByPk(req.params.id);
            if (!volunteer) {
                return res.status(404).send('Волонтер не найден');
            }
            res.render('edit-volunteer-account', { volunteer });
        } catch (error) {
            console.error(error);
            res.status(500).send('Ошибка сервера');
        }
    }
}

module.exports = new VolunteerController();