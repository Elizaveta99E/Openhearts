const Router = require('express')
const EventRouter = require('../routes/event_router')
const StaffRouter = require('../routes/staff_router')
const VolunteerRouter = require('../routes/volunteer_routes')
const AuthRouter = require('../routes/auth_router')
const updateEvent =require ('../routes/updatelistevents')
const ConditionsOfEventsRout = require('../routes/conditionsofevents')
const analiticRouter = require('../routes/analitic') //Для страницы по аналитике
const Stafftsble = require('../routes/stafftable') //Для страницы по список сотрудников
const eventsRoutes = require('../routes/event_router');
const activityRoutes = require('../routes/activity_router');
const formatrouter = require('../routes/format_router')
const EventsStatus = require('../routes/eventsStatus')
const citiesrouter = require('../routes/city_router')
const staffrouter = require('../routes/staff_router')
const Volunteersrouter = require('../routes/volunteer_routes')
const PeculiaritiesOfEventsRouter = require ('../routes/PeculiaritiesOfEvents_router')
const UsersRouter = require ('../routes/users_router')
const PeculiaritiesRouter = require('../routes/peculiarities_routes')
const ConditionsRouter = require('../routes/Condition_router')
const StaffRolesRouter = require('../routes/StaffRoles_router')
const CourseRouter = require('../routes/course_router')

const router = new Router();

router.use('/event', EventRouter)
router.use('/staff', StaffRouter)
router.use('/volunteer', VolunteerRouter)
router.use('/auth', AuthRouter)
router.use('/peculiarities', PeculiaritiesRouter)
router.use('/conditions', ConditionsRouter)
router.use('/StaffRoles', StaffRolesRouter)
router.use('/course', CourseRouter)
router.use('/activity', activityRoutes)
router.use('/format',formatrouter)
router.use('/eventsstatus', EventsStatus)
router.use('/events', eventsRoutes);
router.use('/cities', citiesrouter);
router.use('/staff', staffrouter);
router.use('/volunteers', Volunteersrouter)
router.use('/PeculiaritiesOfEvents', PeculiaritiesOfEventsRouter)
router.use('/users', UsersRouter)
router.use('/update',updateEvent) //потом убрать
router.use('/ConditionsOfEvents', ConditionsOfEventsRout)
router.use('/analitic', analiticRouter) //Для страницы по аналитике
router.use('/stafftable', Stafftsble) //Для страницы по список сотрудников


module.exports = router