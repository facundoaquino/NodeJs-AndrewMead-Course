require('../src/db/mongoose')
const Task = require('../src/models/task')
const User = require('../src/models/user')

//5fd536178a984410e4c2d4c4

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age })

	const count = await User.countDocuments({ age })

	return count
}
updateAgeAndCount('5fd536178a984410e4c2d4c4', 15).then((result) => {
	console.log(result)
})

// C H A L L E N C H E

const deleteTaskAndCount = async (id) => {
	const task = await Task.findByIdAndDelete(id)
	const count = await Task.countDocuments({ completed: false })

	return { taskDelete: task, DocumentsIncomplete: count }
}

deleteTaskAndCount('5fd5630be681133d2064487f')
	.then((result) => {
		console.log(result)
	})
	.catch((error) => {
		console.log(error)
	})
