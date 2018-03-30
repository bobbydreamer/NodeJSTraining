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

//asyncAdd(5,7).then( (resolved) => {  // This works
asyncAdd(5,'7').then( (resolved) => {  // First promise is a reject and later second resolve gets executed. THis is a issue with Promises. See file promise4.js, we will use catch
    console.log('resolved : '+resolved);
    return asyncAdd(resolved, 5);
}, (rejected) => {
    console.log('rejected : '+rejected);
}).then( (resolved)=>{
    console.log('resolved chain 1: '+resolved);
}, (rejected) => {
    console.log('rejected chain 1: '+rejected);
});