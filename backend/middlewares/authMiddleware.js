const User=require('../models/userModel')
const jwt=require('jsonwebtoken')

exports.verifyUser=async(req,res,next)=>{
    try{
        const testtoken=req.headers.authorization;
        let token;
        if(testtoken && testtoken.startsWith('Bearer')){
            token=testtoken.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({
                message:"Please login again to ascess this resource"
            })
        }

        const decodedToken=await jwt.verify(token,process.env.MY_SECRET_KEY)

        const user=await User.findById(decodedToken.id)
        if(!user){
            return res.status(401).json({
                message:"user no longer exists"
            })
        }

        req.user=user;
        next();
    }
    catch(err){
        res.status(401).json({
            messgae:"Invalid or expired token"
        })
    }
}