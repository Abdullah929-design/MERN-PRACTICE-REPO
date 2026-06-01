const express=require("express");
require("./db");
const app=express();
const bodyparser=require("body-parser")
app.use(bodyparser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const cors=require("cors");




require('dotenv').config();




app.use(cors());


const authRoutes = require("./routes/authrouter");
app.use(authRoutes);

const productRoutes=require("./routes/productrouter");
app.use(productRoutes);

const PORT=process.env.PORT || 8000;

app.get("/ping",(req,res)=>{
    res.send("Pong");
})


app.listen(PORT, ()=>{
    console.log("This is the backend")
})

