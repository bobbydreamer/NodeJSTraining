console.log(`Starting Test2.js in ${module.filename}`);

// 1. Requires - 3rdParty
const fs = require('fs');
const _ = require('lodash');
const notes = require('./notes.js'); // ./ relative path points to current directory
const yargs = require('yargs');

console.log(_.isString(`sushanth`));
console.log(_.isString(1));

//uniq(array)
var array = [1,1,3,2, `sbobby`, `bobby`, 'bobby', 'Sushanth'];
console.log(_.uniq(array));

//Command line arguments = process - [0] - node.exe, [1] - current file path, [2] - argument
console.log(process.argv);
var pargv = process.argv[2];
console.log(`Process argv : ${pargv}`);

var yargv = yargs.argv;
console.log(`yargs argv : `,yargv);

//In yargs all keyvalue arguments are in _ key
var yarg = yargv._[0];
console.log(`yarg : ${yarg}`);

// Test Commands
// node lodash add --title="Hello World" --body "#INCLUDE<STDIO.H>"
// node lodash remove --title="hello"
// node lodash list
// node lodash read --title="hello"

if(pargv == 'add'){
    notes.addNote(yargv.title, yargv.body);
} else if(pargv == 'remove'){
    notes.removeNote(yargv.title);
} else if(pargv == 'list'){
    notes.getAll();
} else if(pargv == 'read'){
    notes.readNote(yargv.title);
} else{
    console.log(`not a valid command`);
}
