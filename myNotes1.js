console.log(`Starting Test2.js in ${module.filename}`);

// 1. Requires - 3rdParty
const fs = require('fs');
const _ = require('lodash');
//const notes = require('./notes.js'); // ./ relative path points to current directory
const notes = require('./notes1.js'); // ./ relative path points to current directory
const yargs = require('yargs');

//Notes filename
const filename = `myNotes.json`;

//Getting Command line arguments
var yargv = yargs.argv;
console.log(`yargs argv : `,JSON.stringify(yargv));

//In yargs all keyvalue arguments are in _ key
var command = yargv._[0];
console.log(`Command : ${command}`);

// Test Commands
// node .\myNotes1.js add --title "Testing5" --body "BodyforTest5"
// node .\myNotes1.js remove --title "Testing3"
if(command == 'add'){
    var noteRC = notes.addNote(filename, yargv.title, yargv.body);
    if(noteRC){ //In JS if nothing is returned undefined will be returned. 
        notes.listNote(noteRC, `Added`);
        // console.log(`Note Added`);
        // console.log(`-- Title : ${noteRC.title}`);
        // console.log(`-- Body  : ${noteRC.body}`);
    }
    else
        console.log(`Note already taken`);

} else if(command == 'remove'){
    var noteRC = notes.removeNote(filename, yargv.title);
    noteRC = noteRC ? `Note Removed` : `Note not found`;
    console.log(noteRC);
} else if(command == 'list'){
    var noteRC = notes.getAll(filename);
    console.log('Notes length : ',noteRC.length);
    noteRC.forEach( (note) => { //This is version 1 of arrow function(=>) called Statement Arrow Function. Latest version of arrow function is used in notes1.js in getNote()
        notes.listNote(note, 'list');
    });
} else if(command == 'read'){
    var noteRC = notes.readNote(filename, yargv.title);
    notes.listNote(noteRC, 'list');
} else{
    console.log(`not a valid arguments used. Valid arguments are (add remove list read)`);
}
