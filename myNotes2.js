// myNote - Adding notes to JSON file
console.log(`Starting Test2.js in ${module.filename}`);

// 1. Requires - 3rdParty
const fs = require('fs');
const _ = require('lodash');
//const notes = require('./notes.js'); // ./ relative path points to current directory
const notes = require('./notes1.js'); // ./ relative path points to current directory
const yargs = require('yargs');

const filename = `myNotes.json`;    //Notes filename
const titleOptions = {
                        describe:'Title of note',   
                        demand:true,                
                        alias:'t'                   
                      };
const bodyOptions = {
                        describe:'Description of note',
                        demand:true,
                        alias:'b'
                     };

// Getting Command line arguments
// Commands
// node mynotes2 --help
// node mynotes2 add --help
var yargv = yargs
            .command('add', 'Add a note', {     //Command takes 3 arguments, 1.Name_of_command 2.Description_of_command 3.Options_command_should_have
                //Alternative 1
            /*  title:{
                    describe:'Title of note',   //description of the option --title
                    demand:true,                //is the --title required or is it optional. default is false
                    alias:'t'                   //instead of --title now you can type -t
                },
                body:{
                    describe:'Description of note',
                    demand:true,
                    alias:'b'
                }*/
                title:titleOptions,
                body:bodyOptions
            })
            .command('list', 'List all notes')
            .command('read', 'Read a note', {
                title:titleOptions
            })
            .command('remove', 'Remove a note',{
                title:titleOptions
            })
            .help()                             //by adding this now you get --help
            .argv;
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
