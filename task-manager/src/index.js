const express = require('express')
const { ReplSet } = require('mongodb')
const app = express()
//require the file only to ejecute them
require('./db/mongoose')
// import de user model and task

const Task = require('./models/task')
const User = require('./models/user')

const port = process.env.PORT || 3000

/*---------------------- required routes ---------------------*/

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

/*---------------------- setup middlewares ---------------------*/

// parse json data

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*---------------------- USE ROUTES ---------------------*/

app.use(userRouter)

app.use(taskRouter)

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})
