// create a model for users

const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User
