// Promise Chaining
var asyncAdd = (a, b) => {

    return new Promise( (resolve, reject) => {

        setTimeout( ()=> {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            }else{
                reject('Arguments must be number');
            }
        }, 1500);

    });

};

asyncAdd(5,7).then( (resolved) => {  // This works
//asyncAdd(5,'7').then( (resolved) => {  // and this works
    console.log('resolved : '+resolved);
    return asyncAdd(resolved, 5);
}).then( (resolved)=>{
    console.log('resolved chain 1: '+resolved);
}).catch( (error) => {
    console.log('Catching the reject : ',error);
});