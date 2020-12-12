//mongoose use mongodb module behind escene to use all the methods to conect base date

const mongoose = require('mongoose')

//a diferencia del modulo mongodb la base de datos la especificamos en connect
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useNewUrlParser: true,
	useCreateIndex: true,
})

//PAQUETE VALIDATOR MUY RECOMENDADO Y POPULAR PARA HACER VALIDACIONES ( npm install validator)

const validator = require('validator')

// create a model for users

const User = mongoose.model('User', {
	//con required podemos obviar la edad pero si o si tenemos que pasar un name

	name: {
		type: String,
		required: true,
		trim: true,
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number')
			}
		},
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid')
			}
		},
	},
	password: {
		type: String,
		required: true,
		minLength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('password cannot contain "password"')
			}
		},
	},
})

// create a model for tasks

const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
})

// --------------

// instance a new user and task

const me = new User({
	name: '    facundo emmanuel     ',
	password: '1234556',

	email: 'FACUN@live.com',
})

const task = new Task({
	description: 'do something at day',
})

// save methods returns a promise  , this method is use to save in data base a document

me.save()
	.then(() => {
		console.log(me)
	})
	.catch((error) => {
		console.log(error)
	})

task.save()
	.then(() => {
		console.log('Success!')
	})
	.catch((error) => {
		console.log(error)
	})
