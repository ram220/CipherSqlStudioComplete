const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"username is a required field"],
        minlength:[3,"username length should be atleast 3"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is a required field"],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is a required field"],
        minlength:[6,"password length should be atleast 6"],
        trim:true
    },
    role:{
        type:String,
        default:"user"
    }
})

const Users=mongoose.model("User",userSchema)

module.exports=Users;