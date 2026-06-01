require('dotenv').config(); 
const uri=process.env.mongoURI;
const mongoose=require('mongoose');


mongoose.connect(uri).then(()=>{
    console.log("Mongo DB connected");
}).catch((err)=>{
    console.log("Mongo DB failure",err);

})
