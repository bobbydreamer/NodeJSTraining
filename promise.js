// Example of promise 

// Promise takes one function with two arguments 
var somePromise = new Promise( (resolve, reject) => {

    setTimeout( () => {
        resolve('It worked');
        //reject('Failed to fulfill promise');
    }, 2500);

});

somePromise.then( (resolved) => {
    console.log('Success : '+resolved);
}, (rejected) => {
    console.log('Fail : '+rejected);
});


//1. Comparing promise with geocode callback example, for callback(error, results) we provide one argument if error and second argument if things went well
//2. Instead of that two types of callback overload, promises provide two functions we can call
//3. When using promises, we can call with only one argument, so if there are multiple values use object
//4. You can either call resolve() or reject(). Whereas in callbacks you can call it many times, that might cause problems. 