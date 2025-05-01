const express = require ('express')
const staffRouter = require('./routes/staff.routes')
const PORT = process.env.PORT || 8080
const app = express()
app.use('/api', staffRouter)
app.listen(PORT,  () => console.log(`server started on post ${PORT}`))