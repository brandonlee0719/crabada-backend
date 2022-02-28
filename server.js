const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const app = express()


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({
   extended: true
}))
app.use(bodyParser.json())

const userRoute = require('./routers/userRoute')
const coinRoute = require('./routers/coinRoute')

app.use(passport.initialize())
require('./passport')(passport)

app.use('/api/user',userRoute)
app.use('/api/coin',coinRoute)

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
   console.log(`Server is ready to run on the port ${PORT}`);
   mongoose.connect('mongodb://localhost/bitPlay', {
      useNewUrlParser: true
   }, () => {
      console.log(`Database is connected successfully`)
   })
})