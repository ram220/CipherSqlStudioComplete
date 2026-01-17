const Users=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

exports.Register=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        if(!name || !email || !password){
            return res.status(400).json({
                message:"Required Fields are missing"
            })
        }

        const user=await Users.findOne({email})
        if(user){
            return res.status(409).json({
                status:"fail",
                message:"Email already Registered"
            })
        }
        

        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=await Users.create({name,email,password:hashedPassword})
        res.status(201).json({
            status:"success",
            message:"user created",
            user:newUser
        })

    }
    catch(err){
        res.status(500).json({
            status:"error",
            message:"Unable to create user",
            err:err.message
        })
    }
}


exports.Login=async(req,res)=>{
    const {email,password}=req.body
    try{
        if(!email || !password){
            return res.status(403).json({
                message:"Required fields are missing"
            })
        }

        const user=await Users.findOne({email})
        if(!user){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const token=jwt.sign({id:user.id},process.env.MY_SECRET_KEY,{expiresIn:"2h"})

        res.status(200).json({
            status:"success",
            message:"Login Success",
            token
        })
    }
    catch(err){
        res.status(500).json({
            status:"error",
            message:"unable to login",
            err:err.message
        })
    }
}