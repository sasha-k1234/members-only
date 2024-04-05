const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
userRouter.get('/',(req,res)=>{
  res.render('main', { title: 'Welcome' });
});



module.exports = userRouter;
