// const validator = require('validator')
// const textGet = require('./notes')

//  const text = textGet()

// console.log(text)

// console.log(validator.isEmail('diptadas73@gmail.com'))

// console.log(validator.isURL('https://dasdipta.com'))

const chalk = require('chalk')
const { argv } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes')

yargs.version('1.1.0')

// console.log(chalk.red.bold.inverse('Success!'))

// console.log(process.argv[2])
// console.log(process.argv)

// console.log(yargs.argv)


// const command = process.argv[2]

// if(command === 'add'){
//     console.log('Adding Notes!')
// }else if(command === 'remove'){
//     console.log('Removing note!')
// }

// add, remove, read, list

//Create add command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type:'string'
        },
        body:{
            describe: 'note body',
            demandOption:true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
        
    }
})

//Create remove command

yargs.command({
    command: 'remove',
    describe: 'Remove note',
    builder:{
        title:{
            describe: 'Note title which will be removed',
            demandOption: true,
            type: 'string'
        }
        
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//Create List command

yargs.command({
    command: 'list',
    describe: 'List of the notes',
    handler: function(){
        // console.log("Showing the list")
        notes.listNotes()
    }
})

//Create Read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder:{
        title:{
            describe: 'Reading a note',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

console.log(yargs.argv)