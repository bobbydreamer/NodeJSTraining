// Requires
const os = require('os');
const sprintf=require("sprintf-js").sprintf;

var user = os.userInfo();
console.log(user);
console.log(sprintf('user : %(username)s',user)); //Gets value from JSoN
console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());

/*
console.log(sprintf("Space Padded => %10.2f", 123.4567));
console.log(sprintf("    _ Padded => %'_10.2f", 123.4567));
console.log(sprintf("    0 Padded => %010.2f", 123.4567));
console.log(sprintf(" Left align => %-10.2f", 123.4567));
*/

 var gigaByte = 1 / (Math.pow(1024, 3)); 
console.log(sprintf('%20s(GB) : %-10.2f', "Total Memory", os.totalmem() * gigaByte, 'GBs')); 
console.log(sprintf('%20s(GB) : %-10.2f', "Available Memory", os.freemem() * gigaByte, 'GBs')); 
console.log(sprintf('%20s(GB) : %-10.2f', "Percent consumed", 100 * (1 - os.freemem() / os.totalmem())) );

const cpus = os.cpus();
//console.log(`CPU : ${cpus}`); //does not work
//console.log(cpus);
for(var i = 0, len = cpus.length; i < len; i++) {
    var temp1="", temp2="";
    temp1 = sprintf("CPU %2s",i)    
    var cpu = cpus[i], total = 0;

    for(var type in cpu.times) {
        total += cpu.times[type];
    }

    for(type in cpu.times) {
        temp2+= sprintf("%s:%s ",type, Math.round(100 * cpu.times[type] / total));
        //console.log("\t", type, Math.round(100 * cpu.times[type] / total));
    }
    console.log(temp1+" = "+temp2);
}