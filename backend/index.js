const express = require('express');
const sequelize =  require('./db');
const router = require('./routes/index_router');
const cors = require('cors');
const Error = require('./middleware/error_middleware');
const models = require('./models');
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



app.get('/', (req, res) => {
  res.render('index.ejs', {foo: 'FOO'})
})

app.get('/registration', (req, res) => {
  res.render('registration.ejs', {foo: 'FOO'})
})

app.get('/login', (req, res) => {
  res.render('Log_in.ejs', {foo: 'FOO'})
})

app.get('/events', (req, res) => {
  res.render('events.ejs', {foo: 'FOO'})
})

app.get('/edit_volunteer_account', (req, res) => {
  res.render('edit_volunteer_account.ejs', {foo: 'FOO'})
})

app.get('/volunteer_account', (req, res) => {
  res.render('volunteer_account.ejs', {foo: 'FOO'})
})

app.get('/forget_password', (req, res) => {
  res.render('forget_password.ejs', {foo: 'FOO'})
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