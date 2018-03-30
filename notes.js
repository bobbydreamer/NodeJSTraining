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

 var addNote = (title, body) => {
    console.log(`Adding Note = (title, body) : (${title},${body})`);
    var noteArr = [];
    //Using ES6 Feature where title:title implies you can just mention title. Here title is key and title variable is value

    var note = {title, body}; 
    
    try{
        var noteStr = fs.readFileSync('myNotes.json');
        noteArr = JSON.parse(noteStr);    
    }catch(e){        
        //No code required
    }

    // Add duplicate to the variable duplicateNotes. Filter() is a array method that takes a callback. Callback is going to get called with an argument in this case its a single argument. If noteArr has array of notes, its gonna get called for every item and function returns true or false
    // Alternative 1
/*     var duplicateNotes = noteArr.filter( (note) => {
        return note.title === title;
    } );
 */
    // Alternative 2 - This is equivalent to above code
    var duplicateNotes = noteArr.filter( (note) => note.title === title );

    if(duplicateNotes.length === 0){
        noteArr.push(note);
        fs.writeFileSync("myNotes.json", JSON.stringify(noteArr));
    } 

 }

 var listAll = () => {
    console.log(`Listing all Notes`);
 }

 var removeNote = (title) => {
    console.log(`Removing Note = (title) : (${title})`);
 };

 var getNote = (title) => {
    console.log(`Read Note = (title) : (${title})`);
 };
 
 module.exports = {
    addNote, //This line is equal to addNote:addNote since object:key are same you can just mention one value(feature for ES6)
    getAll:listAll,
    removeNote,
    readNote:getNote
};