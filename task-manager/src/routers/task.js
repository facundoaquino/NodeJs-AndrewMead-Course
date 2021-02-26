const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const Task = require('./../models/task')

router.get('/task/:id', async (req, res) => {
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

router.get('/tasks', async (req, res) => {
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

router.post('/task', auth, async (req, res) => {
	// const task = new Task(req.body)
	const task = new Task({
		...req.body,
		owner:req.user._id
	})

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

router.patch('/tasks/:id', async (req, res) => {
	// validar primero si la propiedad que se quiere actualizar existe , sino existe tirar un error de operacion invalida

	const updates = Object.keys(req.body)
	const allowedUpdates = ['description', 'completed']

	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(404).send('Invalida operation !')
	}

	try {
		// const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
		const task = await Task.findById(req.params.id)
		updates.forEach((update) => (task[update] = req.body[update]))
		await task.save()
		if (!task) {
			res.status(404).send()
		}

		res.send(task)
	} catch (error) {
		res.status(400).send({ error: 'Invalid Updates!' })
	}
})

/*---------------------- DELETED ROUTES ---------------------*/

router.delete('/task/:id', async (req, res) => {
	try {
		const user = await Task.findByIdAndRemove(req.params.id)

		if (!user) {
			return res.status(404).send()
		}
		res.send(user)
	} catch (error) {
		res.status(500).send(error)
	}
})

module.exports = router
