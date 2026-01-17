const express=require('express')
const userControllers=require("../controllers/userController")

const router=express.Router()

router.post('/register',userControllers.Register);
router.post('/login',userControllers.Login);

module.exports=router;