//console.log(`-- Starting getWeather utility app in ${module.filename}`);
// Website name is forecast.io and API provider of the website is darksky.net
// Forecast.io = e9b1879112695c11a0f70d86e4f68e6c
//   URL : https://api.darksky.net/forecast/e9b1879112695c11a0f70d86e4f68e6c/37.8267,-122.4233

//Requires
var request = require('request');

var forecastKey = 'e9b1879112695c11a0f70d86e4f68e6c';

var getWeather = (lat, lng, callback) => {

    const url = 'https://api.darksky.net/forecast/'+forecastKey+'/'+lat+','+lng;
//    console.log('Forecast.io URL : ',url);

    request({
        url,
        json:true
    }, (error, response, body) => {
        //console.log( JSON.stringify(body, undefined, 2) );    
        if(!error && response.statusCode=== 200){ 
            callback(undefined, {
                   temperature: body.currently.temperature,
                   temperatureFeelslike: body.currently.apparentTemperature,
                   humidity: body.currently.humidity
            });
            // console.log( body.currently.temperature);
            // console.log( body.currently.apparentTemperature);
            // console.log( body.currently.humidity);    
        }else {
            callback('Unable to fetch weather from forecast.io');
            //console.log('Unable to fetch weather from forecast.io');    
        }
    });    

};

module.exports.getWeather = getWeather;

//console.log(`-- Starting getWeather utility`);