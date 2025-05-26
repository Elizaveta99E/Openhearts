const express = require('express');
const sequelize =  require('./db');
const router = require('./routes/index_router');
const cors = require('cors');
const Error = require('./middleware/error_middleware');
const path = require('path');
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 8080;
const { authMiddleware } = require('./middleware/auth_middleware');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json())
app.use(authMiddleware);
app.use('/api', router)
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
  res.render('index.ejs', {foo: 'FOO'})
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