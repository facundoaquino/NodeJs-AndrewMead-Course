// create a model for users

const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

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
		unique: true,
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
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
})

/*---------------------- seteamos relacion de user y task , es un propiedad virtual---------------------*/

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner',
})

/*---------------------- seteando un nuevo metodo en el schema user , usa this por eso no se usa arrow function ---------------------*/

//validation con token json
userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, 'andrewcourse')

	user.tokens = user.tokens.concat({ token })

	await user.save()
	return token
}

userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()
	delete userObject.password
	delete userObject.tokens
	return userObject
}

/*---------------------- creando metodos staticos con userSchema.statics ---------------------*/

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email: email })

	if (!user) {
		throw new Error('unable to login')
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		throw new Error('Unable to login')
	}

	return user
}

//-----------validamos con un middleware pre , para que valida antes de guardar en este caso un usuario
//-----------el callback no puede ser arrow function porque hace uso del contexto this

//hash password middleware
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
