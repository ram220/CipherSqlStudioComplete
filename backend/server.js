const express=require('express')
const dotenv=require('dotenv')
dotenv.config({path:"./.env"})
const connectDB=require('./config/db')
const cors=require('cors')

const userRoutes=require("./routes/userRoutes")
const assignmentRoutes=require("./routes/assignmentRoutes")
const queryRoutes=require('./routes/queryRoutes')
const progressRoutes=require('./routes/progressRoutes')
const app=express();
app.use(express.json())


// allow preflight requests
app.options("*", cors());



connectDB();

app.use("/api/users",userRoutes)
app.use('/api/assignments',assignmentRoutes)
app.use("/api/query",queryRoutes);
app.use("/api/progress",progressRoutes)


app.use("/",(req,res)=>{
    res.send("hello from the server");
})

const port=process.env.PORT || 7000;
app.listen(port,()=>{
    console.log("server running on port: ",port);
})