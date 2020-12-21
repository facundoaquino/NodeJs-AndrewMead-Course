// create a model for users

const mongoose = require('mongoose')
const validator = require('validator')

const bcrypt = require('bcryptjs')

//-----------hay que crear un schema para sacar provecho de los middlewares

const userSchema = new mongoose.Schema({
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

//-----------validamos con un middleware pre , para que valida antes de guardar en este caso un usuario
//-----------el callback no puede ser arrow function porque hace uso del contexto this

userSchema.pre('save', async function (next) {
	const user = this

	//-----------hass password

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
