const express=require('express')
const progressControllers=require('../controllers/progressControllers')
const authMiddleware=require('../middlewares/authMiddleware')

const router=express.Router()

router.post('/save',authMiddleware.verifyUser,progressControllers.saveProgress)
router.get('/my',authMiddleware.verifyUser,progressControllers.getMyProgress)
router.get('/:id',authMiddleware.verifyUser,progressControllers.getProgress)

module.exports=router;