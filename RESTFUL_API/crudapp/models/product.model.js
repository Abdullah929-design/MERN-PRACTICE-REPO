const mongoose=require("mongoose");


const ProductSchema=mongoose.Schema(
    {
        name: { type: String,required:[true,"Please enter the product name"]},
        quantity:{type: Number,required:[true,"Please enter the product quantity"]},
        price:{type:Number, required:[true,"Please enter the price"]},
        image:{type:String,required:[false,"Recommended to enter the image"]}
    }
);
const Product=mongoose.model("Product",ProductSchema);
module.exports=Product;