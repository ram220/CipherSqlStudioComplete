const Assignments=require('../models/assignmentModel')
const expectedResult=require('../utils/expectedResults')
exports.getAllAssignments=async(req,res)=>{
    try{
        const assignments=await Assignments.find({}, "title description difficulty");

        res.status(200).json({
            status:"success",
            data:assignments,
        })
    }
    catch(err){
        res.status(500).json({
            message:"unable to fetch assignments",
            err:err.message
        })
    }
}

exports.getAssignmentById=async(req,res)=>{
    try{
        const id=req.params.id;

        const assignment=await Assignments.findById(id);

        const expectResult=await expectedResult(id)
        res.status(200).json({
            status:"success",
            data:assignment,
            realResult:expectResult
        })
    }
    catch(err){
        res.status(500).json({
            message:"unable fetch Assignment",
            err:err.message
        })
    }
}