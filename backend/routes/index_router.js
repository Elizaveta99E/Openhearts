const Router = require('express')
const EventRouter = require('../routes/event_router')
const StaffRouter = require('../routes/staff_router')
const VolunteerRouter = require('../routes/volunteer_routes')
const AuthRouter = require('../routes/auth_router')

const router = new Router();

router.use('/event', EventRouter)
router.use('/staff', StaffRouter)
router.use('/volunteer', VolunteerRouter)
router.use('/auth', AuthRouter)

module.exports = router