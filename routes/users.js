const express=require('express');
const router=express.Router();

const usersController=require('../controllers/users_controller');

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.use('/posts',require('./posts'));
router.post('/create',usersController.create)

//ye file kahi par import karani padegi isliye yaha se export ki hai
module.exports=router;