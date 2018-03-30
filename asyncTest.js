console.log('Starting app');

setTimeout(() => {
    console.log('Inside first timeout callback');
}, 2000);

setTimeout(() => {
    console.log('Inside second timeout callback');
}, 0);

console.log('Ending app');