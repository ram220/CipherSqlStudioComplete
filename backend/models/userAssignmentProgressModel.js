const mongoose=require('mongoose')

const progressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    assignmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Assignment',
        required:true,
    },
    sqlText:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:["In_Progress","Completed"],
        default:"In_Progress"
    },
    isCorrect:{
        type:Boolean,
        default:false
    },
    
},{timestamps:true});

const Progress=mongoose.model("Progress",progressSchema);

module.exports=Progress;