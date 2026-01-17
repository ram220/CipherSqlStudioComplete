const express=require('express')
const queryControllers=require('../controllers/queryControllers')

const router=express.Router();

router.post('/execute',queryControllers.Execute);

module.exports=router