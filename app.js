const fs = require('fs');
const express = require('express');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const app = express();


// middleware : a function that modifies the incoming data
app.use(express.json());

/**Custorm middleware */
app.use((req, res, next) => {
  console.log("hey from middleware")
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next();
})

/*Read file */




app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
