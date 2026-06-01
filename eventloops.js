const fs=require("fs");
console.log("This is a sync func1");
process.nextTick(()=>{
    console.log("This is a next tick function");

})
console.log("This is a sync func 2")

//make sure always the sync functionas recieve priority in execution
Promise.resolve().then(()=>console.log("This is a promise func"));
//promise func is always executed after the next tick

//inner next ticks are always executed after all nextticks have been executed 

fs.readFile(__filename,()=>console.log("This is a IO"));
setTimeout(()=>console.log("this is time out"));
//timeout runs first than IO than check than close

setImmediate(()=>console.log("This is check"))