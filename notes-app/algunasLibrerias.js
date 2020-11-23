const fs = require('fs') 
const validator = require('validator')
const chalk = require('chalk')
const notes = require('./notes')

//  si no esta el archivo en este caso notes , lo creo , y el writefile pisa el contenido existente
 fs.writeFileSync('notes.txt','probando node  ')

//  usando appendFile para añadir al archivo y no pisarlo 

fs.appendFileSync('notes.txt', 'sumando mas contenido')


 

console.log(validator.isEmail('facun@live.com'))
console.log(validator.isURL('facunivecom'))
 

// probando libreria para imprimir por consola con colores resaltados

 
console.log(chalk.red('Testing chalk in red '));

 