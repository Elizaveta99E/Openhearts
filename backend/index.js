const express = require('express');
const sequelize =  require('./db');
const router = require('./routes/index_router');
const cors = require('cors');
const Error = require('./middleware/error_middleware');
const models = require('./models');
const PeculiaritiesRouter = require('./routes/peculiarities_routes')
const ConditionsRouter = require('./routes/Condition_router')
const StaffRolesRouter = require('./routes/StaffRoles_router')
const CourseRouter = require('./routes/course_router')
const cookieParser = require('cookie-parser');
const eventsRoutes = require('./routes/event_router');
const activityRoutes = require('./routes/activity_router');
const formatrouter = require('./routes/format_router')
const EventsStatus = require('./routes/eventsStatus')
const citiesrouter = require('./routes/city_router')
const staffrouter = require('./routes/staff_router')
const Volunteersrouter = require('./routes/volunteer_routes')
const PeculiaritiesOfEventsRouter = require ('./routes/PeculiaritiesOfEvents_router')
const UsersRouter = require ('./routes/users_router')
const PORT = process.env.PORT || 8080;
const updateEvent =require ('./routes/updatelistevents')
const ConditionsOfEventsRout = require('./routes/conditionsofevents')
const analiticRouter = require('./routes/analitic') //Для страницы по аналитике
const Stafftsble = require('./routes/stafftable') //Для страницы по список сотрудников

const app = express();

app.set('view engine', 'ejs')

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json())
app.use('/api', router)
app.use('/static', express.static('static'))
app.use('/peculiarities', PeculiaritiesRouter)
app.use('/conditions', ConditionsRouter)
app.use('/StaffRoles', StaffRolesRouter)
app.use('/course', CourseRouter)
app.use('/activity', activityRoutes)
app.use('/format',formatrouter)
app.use('/eventsstatus', EventsStatus)
app.use('/events', eventsRoutes);
app.use('/cities', citiesrouter);
app.use('/staff', staffrouter);
app.use('/volunteers', Volunteersrouter)
app.use('/PeculiaritiesOfEvents', PeculiaritiesOfEventsRouter)
app.use('/users', UsersRouter)
app.use('/update',updateEvent) //потом убрать
app.use('/ConditionsOfEvents', ConditionsOfEventsRout)
app.use('/analitic', analiticRouter) //Для страницы по аналитике
app.use('/stafftable', Stafftsble) //Для страницы по список сотрудников

app.get('/', (req, res) => {
  res.render('index.ejs', {foo: 'FOO'})
})
app.get('/registration', (req, res) => {
  res.render('registration.ejs', {foo: 'FOO'})
})

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Для разработки
    console.log('Database synced');
  } catch(e) {
    console.log('Error', e);
  }
}

start()
app.use(Error)
app.listen(PORT,  () => console.log(`server started on post ${PORT}`))