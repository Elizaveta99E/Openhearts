const Router = require('express');
const VolunteerRouter = require('./volunteer_routes');
const StaffRouter = require('./staff_routes');

const router = new Router();

router.use('./volunteer', VolunteerRouter)
router.use('./staff', StaffRouter)

module.exports = router