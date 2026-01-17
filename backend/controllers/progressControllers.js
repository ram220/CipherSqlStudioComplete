const mongoose=require('mongoose')
const Progress=require('../models/userAssignmentProgressModel')
const Assignment=require('../models/assignmentModel')
const User=require('../models/userModel')


exports.saveProgress=async(req,res)=>{
    try{
        const userId=req.user._id;
        const {assignmentId,sqlText,isCorrect}=req.body

        let progress=await Progress.findOne({userId,assignmentId})

        if(progress){
            progress.sqlText=sqlText
            progress.isCorrect=isCorrect
            progress.status=isCorrect?"Completed":"In_Progress"
            progress.updatedAt=new Date()

            await progress.save()
        }
        else{
            progress=await Progress.create({
                userId,
                assignmentId,
                sqlText,
                isCorrect,
                status:isCorrect?"Completed":"In_Progress"
            })
        }

        res.status(200).json({
            status:"success",
            message:"Progressed saved successfully",
            data:progress
        })
    }
    catch(err){
        res.status(500).json({
            status: "fail",
            message: "Unable to save progress"
        });
    }
}


exports.getMyProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const progress = await Progress.find({userId},"assignmentId status isCorrect sqlText");

    res.status(200).json({
      status: "success",
      data: progress
    });

  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Unable to fetch progress"
    });
  }
};

exports.getProgress=async(req,res)=>{
    try{
        const userId=req.user._id;
        const assignmentId=req.params.id;
        const progress=await Progress.findOne({userId,assignmentId},"sqlText")

        if (!progress) {
            return res.status(200).json({
                status: "success",
                data: null
            });
        }

        res.status(200).json({
            status:"success",
            data:progress
        })
    }
    catch(err){
        res.status(500).json({
            status: "fail",
            message: "Unable to fetch progress"
        });
    }
}
