// Weather App - This example uses Promises
// CMD : node weather -a='cresent park street tnagar chennai'
// CMD : node weather --address 19147
// Google Geocode Key = AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk
//   Google Geocode URL = https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk&address=19147
// Forecast.io = e9b1879112695c11a0f70d86e4f68e6c
//   URL : https://api.darksky.net/forecast/e9b1879112695c11a0f70d86e4f68e6c/37.8267,-122.4233
//console.log('Starting app');

//Requires
var yargs = require('yargs');
var geocode = require('./geocode'); //No need to mention .js
var weather = require('./getWeather');
var axios = require('axios');

// Variables
const googleAPIKey = 'AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk';
const forecastKey = 'e9b1879112695c11a0f70d86e4f68e6c';

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

var address = encodeURIComponent(argv.a);    
const geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key='+googleAPIKey+'&address='+address

axios.get(geocodeUrl).then( (resolved) =>{

    if(resolved.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address.');
    }
    //console.log(resolved.data);
    console.log(resolved.data.results[0].formatted_address);
    const lat = resolved.data.results[0].geometry.location.lat;
    const lng = resolved.data.results[0].geometry.location.lng;
//    console.log(lat+','+lng);
    const weatherUrl = 'https://api.darksky.net/forecast/'+forecastKey+'/'+lat+','+lng;
    return axios.get(weatherUrl);

} ).then( (resolved) => {

    const temperature = resolved.data.currently.temperature;
    const temperatureFeelslike = resolved.data.currently.apparentTemperature;
    const humidity = resolved.data.currently.humidity ;

    console.log(`Its currently ${temperature}. It feels like ${temperatureFeelslike} and humidity is ${humidity}.`);

}).catch( (error) => {
    if(error.code === 'ENOTFOUND')
        console.log('Unable to reach google servers');
    else
        console.log(error.message);    
});

//console.log('Ending app');