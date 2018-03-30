console.log(`Starting notes.js in ${module.id}`);

//console.log(module);
//console.log(module.id);

const fs = require('fs');

module.exports.age = `32`;

/* module.exports.addNotes = () => {
    console.log(`in addNotes()`);
    return `notes added.`
}
 */

var fetchNotes = (filename) => {
    try{
        var noteStr = fs.readFileSync(filename);
        return JSON.parse(noteStr);    
    }catch(e){        
        //No code required
        return [];
    }
};

var saveNotes = (filename, noteArr) => {
    fs.writeFileSync(filename, JSON.stringify(noteArr));
};

 var addNote = (filename, title, body) => {
    console.log(`Adding Note = (title, body) : (${title},${body})`);
    var noteArr = fetchNotes(filename);
    //Using ES6 Feature where title:title implies you can just mention title. Here title is key and title variable is value
    var note = {title, body};     
    var duplicateNotes = noteArr.filter( (note) => note.title === title );

    if(duplicateNotes.length === 0){
        noteArr.push(note);
        saveNotes(filename, noteArr);
        return note;
    } 
 }

 var listAll = (filename) => {    
    return fetchNotes(filename); 
 }

 var removeNote = (filename, title) => {
    console.log(`Removing Note = (title) : (${title})`);
    var noteArr = fetchNotes(filename);
    var newNotes = noteArr.filter( (note) => note.title !== title );
    saveNotes(filename, newNotes);    
    return noteArr.length !== newNotes.length;
 };

 var getNote = (filename, title) => {
    var noteArr = fetchNotes(filename);
    var newNotes = noteArr.filter( (note) => note.title === title );
    return newNotes[0];
 };

 //Utility Functions
var listNote = (note, operation) =>{
    if(typeof note === 'object'){
        //debugger;    
        if(operation === 'Added') {console.log('Note ',operation);}
        console.log(`------------------`);
        console.log(`Title : ${note.title}`);
        console.log(`Body  : ${note.body}`);
    }
    else{
        console.log(`Note not found`);
    }
};

 module.exports = {
    addNote, //This line is equal to addNote:addNote since object:key are same you can just mention one value(feature for ES6)
    getAll:listAll,
    removeNote,
    readNote:getNote,
    listNote
};

