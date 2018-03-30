//JSON Object to String
console.log(`JSON Object to String`);
var jsonStr = {
    name:'Sushanth'
};
var strObj = JSON.stringify(jsonStr);
console.log('typeof jsonStr: ',typeof jsonStr);
console.log('typeof strObj: ',typeof strObj);
console.log('jsonStr : ',jsonStr);
console.log('strObj : ',strObj);

//String to JSON Object
console.log(`String to JSON Object`);
var personStr = '{"name":"Sushanth", "age":33}';
var person = JSON.parse(personStr);
console.log('typeof personStr: ',typeof personStr);
console.log('typeof person: ',typeof person);
console.log(`String : ${personStr}`);
console.log('Object : ',person);

const fs = require('fs');

var oNote = {
    title:'Example Title',
    body:'Example Body'
};
console.log('oNote : ', typeof oNote);

//Convert JSONObject to String
oNoteStr = JSON.stringify(oNote);
console.log('oNoteStr : ', typeof oNoteStr);
console.log('oNoteStr : ', oNoteStr);

//Write to file
fs.writeFileSync('Notes.json', oNoteStr);

//Read JSON file
var rNoteStr = fs.readFileSync('notes.json');

//Convert String to JSONObject
var NoteObj = JSON.parse(rNoteStr);
console.log('NoteObj :',typeof NoteObj);
console.log('NoteObj : ', NoteObj);