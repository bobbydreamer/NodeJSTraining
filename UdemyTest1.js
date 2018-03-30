//console.log(module);
//console.log(module.id); //only in a module this id gets populated, if its a parent/main. Its populated as .(period)
console.log(`Starting UdemyTest1.js in ${module.filename}`);

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js'); // ./ relative path points to current directory

//(node:12904) [DEP0013] DeprecationWarning: Calling an asynchronous function without callback is deprecated.
//fs.appendFile('greetings.txt','Hello World!'); 

/* 
// Alternative 1 : Below works as well
fs.appendFile('greetings.txt','Hello World!', function(err){
    if(err){
        console.log('Unable to write file');
    }
} );  */

var user = os.userInfo();
/* 
// Alternative 2 : Same as above. Callback is called differently using Arrow function
fs.appendFile('greetings.txt','Hello '+user.username+'!', (err) => {
    if(err){
        console.log('Unable to write file');
    }
} );
 */

 // Using Template Strings ES6 feature using tick symbol `(below esc key)
fs.appendFile('greetings.txt',`Hello ${user.username}! You are is ${notes.age}`, (err) => {
    if(err){
        console.log('Unable to write file');
    }
} );

var anote = notes.addNotes();
console.log(`Notes : ${anote}`);

