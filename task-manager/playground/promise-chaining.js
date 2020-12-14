// play whit the promises chaining on models of task-manager

require('../src/db/mongoose')
const Task = require('../src/models/task')
const User = require('../src/models/user')

// 5fd535d049fe5e3840caf382

// UPDATE A USER WIHT FOR HIS _ID , NEED SETUP THE OPTION NEW INTO THE METHOD FINDBYIDANDUPDATE FOR GET DE ACTUALLY USER FOR THIS CASE
//THEN RETURN OTHER METHO FOR SEE DE COUNT OF DOCUMENTS THAN HAVE THESE UPDATE , IN THIS CASE , ALL USER HAVE A DETERMINILLY AGE

User.findByIdAndUpdate('5fd535d049fe5e3840caf382', { age: 15 }, { new: true })
	.then((user) => {
		console.log(user)

		//promises chaining , return other method

		return User.countDocuments({ age: 20 })
	})
	.then((result) => {
		console.log(result)
	})

// challenge

// 5fd60a6c18ea1e1ce4c24ee4
Task.findByIdAndRemove('5fd60a6c18ea1e1ce4c24ee4')
	.then((task) => {
		console.log(task)

		return Task.countDocuments({ completed: false })
	})
	.then((result) => {
		console.log(result)
	})
	.catch((error) => {
		console.log(error)
	})
