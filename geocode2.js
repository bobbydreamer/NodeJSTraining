//console.log(`-- Starting geocode2 utility app in ${module.filename}`);
// Geocode using promises

// Requires
var request = require('request');

// Variables
const googleAPIKey = 'AIzaSyCWhIGjJZb8SP1tSHzomRiII71ocwJPdTk';

var geocodeAddress = (address) => {

    return new Promise( (resolve, reject) => {

        address = encodeURIComponent(address);    
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?key='+googleAPIKey+'&address='+address
        
        request({
            url,
            json:true
        }, (error, response, body) => {
            //console.log( JSON.stringify(body, undefined, 2) );
            if(error){ 
                reject('Unable to connect to Google Servers');
            }else if(body.status ==='ZERO_RESULTS'){
                reject('Cannot find that address');
            }else if(body.status === 'OK'){
                
                resolve({ 
                    address: body.results[0].formatted_address,
                    Latitude: body.results[0].geometry.location.lat,
                    Longtitude: body.results[0].geometry.location.lng
                });
            }    
        });    
    
    });

};

geocodeAddress('Cresent Park Street TNagar').then( (resolved)=>{
    console.log(JSON.stringify(resolved, undefined, 2));
}, (rejected) => {
    console.log(rejected);
} );

// Exports
/*
module.exports = {
    geocodeAddress : geocodeAddress
};
*/
module.exports.geocodeAddress = geocodeAddress;

//console.log(`-- Ending geocode utility app`);