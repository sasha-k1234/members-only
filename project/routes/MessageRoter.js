const express = require('express');
const MsgRouter = express.Router();
const message = require('../controllers/msgController');

const {isAuth,isMember,isAdmin} = require('../utils/middleware');

MsgRouter.get('/write',isAuth,isMember,message.getNew);



MsgRouter.post('/write',isAuth,isMember,message.postNew);

MsgRouter.get('/board',isAuth,isMember,message.msgBoard);

MsgRouter.post('/board/:id',isAuth,isAdmin,message.delMsg);

module.exports = MsgRouter;
