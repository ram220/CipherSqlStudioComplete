const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        const con=await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")
    }
    catch(err){
        console.log("error while connecting to database: ",err)
    }
}

module.exports=connectDB;