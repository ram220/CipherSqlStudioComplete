const mongoose=require('mongoose');

const columnSchema=new mongoose.Schema({
    columnName:{
        type:String,
        required:true
    },
    dataType:{
        type:String,
        required:true
    }
})

const tableSchema=new mongoose.Schema({
    tableName:{
        type:String,
        required:true
    },
    columns:[columnSchema],
    rows:[mongoose.Schema.Types.Mixed]
})


const assignmentSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:['easy','medium','hard'],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    expectedQuery:{
        type:String,
        required:true
    },
    sampleTables:[tableSchema],

},{timestamps:true})

const Assignments=mongoose.model("Assignment",assignmentSchema);
module.exports=Assignments;