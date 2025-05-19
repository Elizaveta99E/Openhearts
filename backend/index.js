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



const PORT = process.env.PORT || 8080;

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