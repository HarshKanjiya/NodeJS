const fs = require('node:fs');
const rr = fs.createReadStream('./data.json','utf-8');

const EventEmitter = require("events");


rr.on('data',(data)=>{
  // fetching data
    // console.log({data});
})



rr.on('end',(data)=>{
  // for the terminating the process
    // console.log("end",{data}); 
})





































const em = new EventEmitter();

em.on("demo", (data) => {
  console.log("demo event",data);
});

setTimeout(() => {
  em.emit("demo",{name:'abcdefg'});
}, 3000);
