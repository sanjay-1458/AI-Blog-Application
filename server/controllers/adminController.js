// CRUD on request

import jwt from "jsonwebtoken";

export const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD){
            return res.status(401).json({success:false,message:"Invalid Credentials"})
        }
        const token=jwt.sign({email},process.env.JWT_SECRET)
        res.status(200).json({success:true,token})
    }
    catch(error){
        console.log(error.message);
        res.status(501).json({status:false,message:error.message});
    }
}