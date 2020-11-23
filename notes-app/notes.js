const fs = require('fs')
const chalk = require('chalk')


 
/*---------------------- function to add a note ---------------------*/

const addNote = (title, body) => {
	 

	const notes = loadNotes()

	//check the note if exists with includes method array

	const duplicateNote = notes.some((note) => note.title == title)
 
 

	if (!duplicateNote) {
		notes.push({
			title,
			body,
		})

		saveNotes(notes)
		console.log(chalk.green.inverse('New note added!'))

	} else {
		console.log(chalk.blue.inverse('Note title taken'))
	}
}
/*---------------------- function to remove note ---------------------*/
const removeNote = (title) => {
	const notes = loadNotes()
	const noteExist = notes.some((note) => note.title == title)
	if (noteExist) {
		const removeNotesFilter = notes.filter((note) => note.title !== title)
		console.log(removeNotesFilter)
		fs.writeFileSync('notes.json', JSON.stringify(removeNotesFilter, null, 6))
		console.log(chalk.green('Note removed'))
	} else {
		console.log(chalk.red('No note found'))
	}
}

/*---------------------- List notes ---------------------*/
const listNotes = ()=>{
	const notes = loadNotes()
	notes.forEach((note,idx) => console.log(`Note ${idx+1}:`+ chalk.blue.inverse(note.title)  ))
}


/*---------------------- read note ---------------------*/

const readNote = (noteTitle)=>{
	
	console.log(noteTitle);
	const notes = loadNotes()
	
	



	const noteExist = notes.find(note=>note.title==noteTitle)

	if(noteExist){
		console.log(chalk.green.inverse('Note: '+noteExist.title));
		console.log(noteExist.body);
	}else{
		console.log(chalk.inverse.red('Note not exists'));
	}
}

const saveNotes = (notes) => {
	const dataJson = JSON.stringify(notes, null, 5)
	fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (e) {
		return []
	}
}

module.exports = {
	 
	addNote,
	removeNote,
	listNotes,
	readNote
}
