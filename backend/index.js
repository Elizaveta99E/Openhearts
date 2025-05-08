const express = require ('express')
const staffRouter = require('./routes/staff.routes')
const sequelize = require('../backend/model')
const PORT = process.env.PORT || 8080
const app = express()

app.set('view engine', 'ejs');

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

  }
  catch {
    console.log("Don't work")
  }
}

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
  res.render('index.ejs', {foo: 'FOO'});
});

app.listen(PORT,  () => console.log(`server started on post ${PORT}`))

app.use('/api', staffRouter)