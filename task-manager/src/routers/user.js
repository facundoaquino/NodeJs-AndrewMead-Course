const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const User = require('./../models/user')

router.get('/users/me', auth, (req, res) => {
	res.send(req.user)

	/*---------------------- cambiamos la ruta para obtener solamente el perfil del usuario registrado/logueado , antes mandabamos todos los usuarios ---------------------*/
	// User.find({})
	// 	.then((users) => {
	// 		res.send(users)
	// 	})
	// 	.catch((error) => {
	// 		res.status(500).send(error)
	// 	})
})

router.post('/users', async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save()

		const token = await user.generateAuthToken()

		res.status(201).send({ user, token })
	} catch (error) {
		res.status(400).send(error)
	}

	// user.save()
	// 	.then(() => {
	// 		res.status(201).send(user)
	// 	})
	// 	.catch((error) => {
	// 		// res.status(400)
	// 		// res.send(error)

	// 		res.status(400).send(error)
	// 	})
})

/*---------------------- login user ---------------------*/

router.post('/users/login', async (req, res) => {
	try {
		/*---------------------- el metodo de user lo creamos nosotros no vienen en el modelo ---------------------*/
		const user = await User.findByCredentials(req.body.email, req.body.password)

		const token = await user.generateAuthToken()
		res.send({ user , token })
	} catch (e) {
		res.status(400).send()
	}
})

// router.get('/users/:id', async (req, res) => {
// 	// mongoose has a method to find for _id

// 	// note we don´t need the new ObjectID to parse de _id , mongoose does that work for us
// 	const _id = req.params.id

// 	try {
// 		const user = await User.findById(_id)

// 		if (!user) {
// 			return res.status(404).send()
// 		}

// 		res.send(user)
// 	} catch (error) {
// 		res.status(500).send(error)
// 	}

// 	// User.findById(_id)
// 	// 	.then((user) => {
// 	// 		if (!user) {
// 	// 			return res.status(404).send()
// 	// 		}

// 	// 		res.send(user)
// 	// 	})
// 	// 	.catch((error) => {
// 	// 		res.status(500).send(error)
// 	// 	})
// })

router.patch('/users/:id', async (req, res) => {
	// validar primero si la propiedad que se quiere actualizar existe , sino existe tirar un error de operacion invalida

	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']

	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(404).send('Invalid update !!')
	}

	try {
		// const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

		const user = await User.findById(req.params.id)

		updates.forEach((update) => (user[update] = req.body[update]))

		await user.save()

		if (!user) {
			res.status(404).send()
		}

		res.send(user)
	} catch (error) {
		res.status(400).send(error)
	}
})

router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)

		if (!user) {
			return res.status(404).send()
		}

		res.send(user)
	} catch (error) {
		res.status(500).send(error)
	}
})


/*---------------------- logout ---------------------*/
router.post('/users/logout', auth, async(req,res)=>{

try{
	req.user.tokens = req.user.tokens.filter(token=> token.token != req.token)
	await req.user.save()
	res.send()
}catch(e){
	res.status(500).send()
}
})

router.post('/users/logoutAll',auth,async(req,res)=>{
	try{
		req.user.tokens = []
		await req.user.save()
		res.send()
	}catch(e){
		res.status(500).send()
	}
})

module.exports = router
