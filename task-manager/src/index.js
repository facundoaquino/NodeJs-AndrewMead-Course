const express = require('express')
const { ReplSet } = require('mongodb')
const app = express()
//require the file only to ejecute them
require('./db/mongoose')
// import de user model and task

const Task = require('./models/task')
const User = require('./models/user')

const port = process.env.PORT || 3000

// parse json data

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/users', async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save()
		res.status(201).send(user)
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

// mongoose methos to get data-base documents , similar to mongodb package

app.get('/users', (req, res) => {
	User.find({})
		.then((users) => {
			res.send(users)
		})
		.catch((error) => {
			res.status(500).send(error)
		})
})

app.get('/users/:id', async (req, res) => {
	// mongoose has a method to find for _id

	// note we don´t need the new ObjectID to parse de _id , mongoose do that´s work for us
	const _id = req.params.id

	try {
		const user = await User.findById(_id)

		if (!user) {
			return res.status(404).send()
		}

		res.send(user)
	} catch (error) {
		res.status(500).send(error)
	}

	// User.findById(_id)
	// 	.then((user) => {
	// 		if (!user) {
	// 			return res.status(404).send()
	// 		}

	// 		res.send(user)
	// 	})
	// 	.catch((error) => {
	// 		res.status(500).send(error)
	// 	})
})

/*---------------------- UPDATE /  PATCH---------------------*/

app.patch('/users/:id', async (req, res) => {
	// validar primero si la propiedad que se quiere actualizar existe , sino existe tirar un error de operacion invalida

	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']

	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(404).send('Invalid update !!')
	}

	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
		if (!user) {
			res.status(404).send()
		}

		res.send(user)
	} catch (error) {
		res.status(400).send(error)
	}
})

app.patch('/tasks/:id', async (req, res) => {
	// validar primero si la propiedad que se quiere actualizar existe , sino existe tirar un error de operacion invalida

	const updates = Object.keys(req.body)
	const allowedUpdates = ['description', 'completed']

	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(404).send('Invalida operation !')
	}

	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
		if (!task) {
			res.status(404).send()
		}

		res.send(task)
	} catch (error) {
		res.status(400).send({ error: 'Invalid Updates!' })
	}
})

app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({})
		if (!tasks) {
			return res.status(404).send()
		}

		res.send(tasks)
	} catch (error) {
		res.status(500).send()
	}

	// Task.find({})
	// 	.then((tasks) => {
	// 		res.status(201).send(tasks)
	// 	})
	// 	.catch((error) => {
	// 		res.status(500).send(error)
	// 	})
})

app.get('/task/:id', async (req, res) => {
	const _id = req.params.id

	try {
		const task = await Task.findById(_id)

		if (!task) {
			return res.status(404).send()
		}

		res.send(task)
	} catch (error) {
		res.status(500).send()
	}

	// Task.findById(_id)
	// 	.then((task) => {
	// 		if (!task) {
	// 			return res.status(404).send()
	// 		}

	// 		res.send(task)
	// 	})
	// 	.catch((error) => {
	// 		res.status(500).send(error)
	// 	})
})

app.post('/task', async (req, res) => {
	const task = new Task(req.body)

	try {
		await task.save()

		res.status(201).send(task)
	} catch (error) {
		res.status(400).send(error)
	}

	// task.save()
	// 	.then(() => {
	// 		res.status(201).send(task)
	// 	})
	// 	.catch((error) => {
	// 		res.status(404).send(error)
	// 	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})
