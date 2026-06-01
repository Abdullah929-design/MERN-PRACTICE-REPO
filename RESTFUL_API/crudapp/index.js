const express=require("express");
const app=express();
app.use(express.json());  // the builtin in app middle ware that we use
app.use(express.urlencoded({extended:false}));  //now you can add all products into mongo db atlas via forms aswell
require("dotenv").config();
const mongoose=require("mongoose");
const Product=require("./models/product.model");

app.listen(3000,()=>{
    console.log("Server is running")
        });



// routes
const productRoutes = require("./routes/product.routes");
app.use("/api/products", productRoutes);   // now this path right here becomes base path and every path in product.routes is an extension to this path

app.get("/", (req, res) => {
  res.send("Hello from rest api");
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb Atlas succesfully connected");
})
.catch((err)=>{
    console.log("Mongodb Atlas error");
    console.log(err);
})