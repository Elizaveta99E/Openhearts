const express = require('express');
const sequelize =  require('./db');
const VolunteerRouter = require('./routes/volunteer_routes');
const StaffRouter = require('./routes/staff_router');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const app = express();

app.set('view engine', 'ejs')

app.use(cors())
app.use(express.json())
app.use('/staff', StaffRouter)
app.use('/volunteer', VolunteerRouter)

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
  res.render('index.ejs', {foo: 'FOO'})
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
  }
  catch {
    console.log('Error')
  }
}

app.listen(PORT,  () => console.log(`server started on post ${PORT}`))