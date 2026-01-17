const validateQuery=require('../utils/validateQuery')
const pool=require('../config/postgrees')
const Assignments=require('../models/assignmentModel')
const compareResults=require('../utils/compareResults')



exports.Execute=async(req,res)=>{
    const {sql,id}=req.body
    try{
        const validate=validateQuery(sql)
        if(!validate.valid){
            return res.status(403).json({
                status:'fail',
                message:validate.message
            })
        }
        
        const result=await pool.query(sql);
        const assignment=await Assignments.findById(id)
        const expectedResult=await pool.query(assignment.expectedQuery)

        const isCorrect=compareResults(result.rows,expectedResult.rows)
        res.status(200).json({
            correct:isCorrect,
            columns:result.fields.map((f)=>f.name),
            rows:result.rows,
            message: isCorrect
                ? "✅ Correct answer"
                : "❌ Incorrect result, try again"
            
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            status:'fail',
            message:'unable to fetch data try after some time'
        })
    }
}

