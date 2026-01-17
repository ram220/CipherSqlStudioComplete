const pool=require('../config/postgrees')
const Assignments=require('../models/assignmentModel')
const expectedResult=async(id)=>{
    try{
        const assignment=await Assignments.findById(id);

        const result=await pool.query(assignment.expectedQuery);

        return {
            columns:result.fields.map(f=>f.name),
            rows:result.rows
        }
    }
    catch(err){

    }
}

module.exports=expectedResult
