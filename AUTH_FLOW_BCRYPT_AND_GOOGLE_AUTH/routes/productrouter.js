const ensureAuthenticated = require("../middleware/Auth");

const router=require("express").Router();
router.get("/product",ensureAuthenticated,(req,res)=>{
    res.status(200).json(
        [
            {
                name:"mobile",
                price:10000
            },
            {
                name:"tv",
                price:15000
            }
        ]
)}
);

module.exports=router;