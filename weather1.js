// Weather App
// CMD : node weather -a='cresent park street tnagar chennai'
// Google Geocode Key = 'AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk'
console.log('Starting app');

//Requires
var request = require('request');
var yargs = require('yargs');

const googleAPIKey = 'AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk';
const argv = yargs
    .options({
        a:{
            demand:true,
            alias:'address',
            describe:'Address to fetch weather for ?',
            string:true //We want the node to consider argument as string
        }
    })
    .help()
    .alias('help', 'h')
    .argv; 

const address = encodeURIComponent(argv.a);
console.log('Address : ',address);    

const url = 'https://maps.googleapis.com/maps/api/geocode/json?key='+googleAPIKey+'&address='+address
console.log('URL : ',url);

// Error
// ZERO_RESULTS - https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk&address=jupiter%20outer%20space
// if(error) - gets triggered when http address is wrong -  https://mapsgoogleapis.com/maps/api/geocode/json?key=AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk&address=cresent%20park%20street%20tnagar%20chennai
request({
    url,
    json:true
}, (error, response, body) => {
    //console.log( JSON.stringify(body, undefined, 2) );
    if(error){ 
        console.log('Unable to connect to Google Servers');
    }else if(body.status ==='ZERO_RESULTS'){
        console.log('Cannot find that address');
    }else if(body.status === 'OK'){
        console.log(`Address    : ${JSON.stringify(body.results[0].formatted_address, undefined, 2)} `);
        console.log(`Latitude   : ${JSON.stringify(body.results[0].geometry.location.lat, undefined, 2)}`);
        console.log(`Longtitude : ${JSON.stringify(body.results[0].geometry.location.lng, undefined, 2)}`);
        console.log(`(Lat Lng) : ${JSON.stringify(body.results[0].geometry.location.lat, undefined, 2)} ${JSON.stringify(body.results[0].geometry.location.lng, undefined, 2)}`);
    }

});

console.log('Ending app');