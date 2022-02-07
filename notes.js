const fs = require('fs')
const chalk = require('chalk')

const getNotes =()=>{
    return "returning code"
}

const addNote =(title, body)=>{
    const notes = loadNotes()
    
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title === title
    // })
    //const duplicateNotes = notes.filter((note)=>  note.title === title)

    const duplicateNote = notes.find((note) => note.title === title)
    // How to do debugging
    // debugger
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Notes added!'))
    }else{
        console.log(chalk.green.inverse('Note title Taken!'))
    }
    
}

const removeNote = (title) =>{
    const notes = loadNotes()

    // const checkNoteTitle = notes.filter(function(note){
    //     return note.title === title
    // })

    const checkNoteTitle = notes.filter((note)=>note.title === title)

    if(checkNoteTitle.length === 0){
        console.log(chalk.red.inverse('Title does not exist! so can not be deleted!'))
    }else{
        const notesFinal = notes.filter(function(note){
            return note.title !== title
        })
        saveNotes(notesFinal)
        console.log(chalk.green.inverse('Note Deleted Successfully!'))
    }

    

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
    
}

const listNotes =()=> {

    
    try{
        console.log(chalk.inverse('Your Notes'))
        const notes = loadNotes()
        notes.forEach((note)=>{
            console.log(note.title)
        })
    }catch(e){
        console.log("List loading error!")
    }
}

const readNote = (title) =>{
    const notes = loadNotes()
    const findNotes = notes.find((note)=> note.title === title )
    if(findNotes){
        console.log(chalk.inverse(findNotes.title))
        console.log(findNotes.body)
    }else{
        console.log(chalk.red.inverse("Title not found"))
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}