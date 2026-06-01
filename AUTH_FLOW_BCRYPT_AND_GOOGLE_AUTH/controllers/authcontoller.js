const usermodel=require("../models/user")
const jwt=require('jsonwebtoken');
const bcrypt = require("bcrypt");
const signup=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const user=await usermodel.findOne({email});
        if(user)
            {
                return res.status(400).json({message:'User already exists with this email',success:false});
            }
        const newUser=new usermodel({name,email,password});
        newUser.password=await bcrypt.hash(password,10);
        await newUser.save();
        res.status(201).json({message:"The Sign up was successful",success:true})
    } catch(err){
        res.status(500).json({message:err.message,success:false});
    }
}

const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await usermodel.findOne({email});
        if(!user)
            {
                return res.status(403).json({message:'Either the email or password is wrong',success:false});
            }
        const isPassEqual=await bcrypt.compare(password,user.password);

        if(!isPassEqual)
            {
                return res.status(403).json({message:'Either the email or password is wrong',success:false});
            }
        const jsontoken=jwt.sign({email:user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})

        

        res.status(200).json({message:"The Login up was successful",success:true,jwtToken: jsontoken})
    } catch(err){
        res.status(500).json({message:err.message,success:false});
    }
}


module.exports={signup,login};