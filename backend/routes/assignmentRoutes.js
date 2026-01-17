const express=require('express');
const assignmentControllers=require('../controllers/assignmentControllers')
const authMiddleware=require('../middlewares/authMiddleware')

const router=express.Router()

router.get('/',assignmentControllers.getAllAssignments);
router.get('/:id',authMiddleware.verifyUser,assignmentControllers.getAssignmentById);


module.exports=router;