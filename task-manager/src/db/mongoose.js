//mongoose use mongodb module behind escene to use all the methods to conect base date

const mongoose = require('mongoose')

//a diferencia del modulo mongodb la base de datos la especificamos en connect
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})

/*---------------------- prbando evento open con moongose ---------------------*/

mongoose.connection.on('open', () => {
	console.log('Database is connected')
})

//PAQUETE VALIDATOR MUY RECOMENDADO Y POPULAR PARA HACER VALIDACIONES ( npm install validator)

// const validator = require('validator')

// create a model for tasks

// --------------

// save methods returns a promise  , this method is use to save in data base a document

// me.save()
// 	.then(() => {
// 		console.log(me)
// 	})
// 	.catch((error) => {
// 		console.log(error)
// 	})

// task.save()
// 	.then(() => {
// 		console.log('Success!')
// 	})
// 	.catch((error) => {
// 		console.log(error)
// 	})
