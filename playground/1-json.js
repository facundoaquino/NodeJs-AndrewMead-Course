const fs = require('fs')

const book = {
	title: 'la casa de los espiritus',
	author: 'isabel allende',
}

//pasar a json una variable
// const bookJson = JSON.stringify(book)
// console.log(bookJson);
// fs.writeFileSync('1-json.json', bookJson)

// const dataBUffer = fs.readFileSync('1-json.json')
// const dataJson = dataBUffer.toString()
// const data = JSON.parse(dataJson)
// console.log(data.title);

const dataBuffer = fs.readFileSync('1-json.json','utf-8')
const data = JSON.parse(dataBuffer)
console.log(data);

data.name='Other name'
data.planet='Venus'
data.age = 25

fs.writeFileSync('1-json.json', JSON.stringify(data))

