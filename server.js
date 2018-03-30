// A simple webserver

// require
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Local Variables
var app = express();
const port = process.env.PORT || 3000;

// Partial is a function which you can run from handlebar templates
hbs.registerPartials(__dirname+'/views/partials');

// View Engine
app.set('view engine', 'hbs');

app.use( (request, response, next) => {
    var now = new Date().toString();
    var log = `${now} : ${request.method} - ${request.url}`

    console.log(log);
    fs.appendFile('server.log', log +'\n', (error) => {
        if(error)
            console.log('unable to write to server.log');
    });
    next(); //This next() is very important, if this function is missed, page will be keep loading it will never finish.
});

//If the below is uncommented other routes will not be available to access.
/* app.use( (request, response, next) => {
    response.render('maintainence.hbs');
});
 */

// Middleware - To use middleware()'s you want to app.USE. Below is for rendering static files
app.use(express.static(__dirname+'/public')); //Absolute directory

// Helper are variables that be used in handlebar templates or partials
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Pages
//app.get(route, handler)
app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to my website',
        
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle:'About page',
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle request'
    });
});

// Listener
//app.listen(3000);
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});