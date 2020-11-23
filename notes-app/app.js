 const fs = require('fs') 
const validator = require('validator')
const chalk = require('chalk')
const notes = require('./notes')
const yargs = require('yargs')
 
 

 //customize yargs version 

 yargs.version('1.1.0')

//  created add command

yargs.command({
    command:'add',
    describe:'Add a new note',
    builder: { 
        title:{
            describe:'Note title',
            //con demandoption decimos que title es requerido
            demandOption: true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler:function(argv){
      notes.addNote(argv.title,argv.body)
    }
})

//create remove command

yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
        title: 'title to remove',
        demandOption:true,
       type: 'string '
    },
    handler: function(argv){
       
        notes.removeNote(argv.title)
    }

})


// create list command

yargs.command({
    command:'list',
    describe:'Liste your notes...',
    handler: function (){
        notes.listNotes()
    }
})

// create read command

yargs.command({
    command:'read',
    describe:'read a note',
    builder: {
        title:'note title',
         
    },
    handler: function(argv){
    
        notes.readNote(argv.title)
    }
})


yargs.parse()
// console.log(yargs.argv)