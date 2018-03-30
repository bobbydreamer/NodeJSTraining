//console.log(`-- Starting geocode utility app in ${module.filename}`);

// Requires
var request = require('request');

// Variables
const googleAPIKey = 'AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk';

var geocodeAddress = (address, callback) => {

    address = encodeURIComponent(address);
//    console.log('Address : ',address);    
    
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?key='+googleAPIKey+'&address='+address
//    console.log('URL : ',url);
    
    // Error
    // ZERO_RESULTS - https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk&address=jupiter%20outer%20space
    // if(error) - gets triggered when http address is wrong -  https://mapsgoogleapis.com/maps/api/geocode/json?key=AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk&address=cresent%20park%20street%20tnagar%20chennai
    request({
        url,
        json:true
    }, (error, response, body) => {
        //console.log( JSON.stringify(body, undefined, 2) );
        if(error){ 
            callback('Unable to connect to Google Servers');
        }else if(body.status ==='ZERO_RESULTS'){
            callback('Cannot find that address');
        }else if(body.status === 'OK'){
            //Second argument of geocodeAddress is a callback and function parameter maps (error, results)
            callback(undefined, { //undefined is first argument because when we have correct results there wont  be any error
                address : body.results[0].formatted_address,
                Latitude: body.results[0].geometry.location.lat,
                Longtitude: body.results[0].geometry.location.lng
            });
            // console.log(`Address    : ${JSON.stringify(body.results[0].formatted_address, undefined, 2)} `);
            // console.log(`Latitude   : ${JSON.stringify(body.results[0].geometry.location.lat, undefined, 2)}`);
            // console.log(`Longtitude : ${JSON.stringify(body.results[0].geometry.location.lng, undefined, 2)}`);
        }
    
    });    
};


// Exports
/*
module.exports = {
    geocodeAddress : geocodeAddress
};
*/
module.exports.geocodeAddress = geocodeAddress;

//console.log(`-- Ending geocode utility app`);