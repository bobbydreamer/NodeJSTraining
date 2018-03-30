// Weather App
// CMD : node weather -a='cresent park street tnagar chennai'
// CMD : node weather --address 19147
// Google Geocode Key = AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk
//   Google Geocode URL = https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk&address=19147
// Forecast.io = e9b1879112695c11a0f70d86e4f68e6c
//   URL : https://api.darksky.net/forecast/e9b1879112695c11a0f70d86e4f68e6c/37.8267,-122.4233
//console.log('Starting app');

//Requires
var yargs = require('yargs');
var request = require('request');
var geocode = require('./geocode'); //No need to mention .js
var weather = require('./getWeather');
 
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

geocode.geocodeAddress(argv.address, (error, results) => {
    if(error)
        console.log(error);
    else if(results){
        console.log(results.address);
        //console.log(JSON.stringify(results, undefined, 2));
        weather.getWeather(results.Latitude, results.Longtitude, (error, results) => {
            if(error)
                console.log(error);
            else if(results){
                   console.log(`Its currently ${results.temperature}. It feels like ${results.temperatureFeelslike}.`); 
                // console.log(JSON.stringify(results, undefined, 2));
            }
        });
                
    }
});


//console.log('Ending app');