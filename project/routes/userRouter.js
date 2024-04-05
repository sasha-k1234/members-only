const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const {validateReg} = require('../utils/validation');

/* GET home page. */
userRouter.get('/',(req,res)=>{
  res.render('main', { title: 'Welcome' });
});

userRouter.post('/registration',validateReg,userController.postRegistration);

userRouter.get('/registration',userController.getRegistration);

module.exports = userRouter;
