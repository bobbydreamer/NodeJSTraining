// A simple webserver

// require
const express = require('express');

// Local Variables
var app = express();

// Middleware - To use middleware()'s you want to use
//  express.static() - Takes in absolute path

console.log('dirname = ',__dirname);
app.use(express.static(__dirname+'/public'));

//app.get(route, handler)
app.get('/', (request, response) => {
    response.send('<h1> Welcome to express! </h1>');
});

app.get('/about', (request, response) => {
    response.send('<h1> About! </h1>');
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle request'
    });
});


//app.listen(3000);
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});