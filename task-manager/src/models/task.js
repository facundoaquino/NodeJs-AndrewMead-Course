const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true,
		minLength: 10,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	// si bien no existen las relaciones como sql , vamos a relacionar una tarea con un documento
	owner:{
		type: mongoose.Schema.Types.ObjectId,
		required:true,
		ref:'User'
	}
})

module.exports = Task
