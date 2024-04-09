const express = require('express');
const MsgRouter = express.Router();
const message = require('../controllers/msgController');

const {isAuth,isMember} = require('../utils/middleware');

/* GET msg's listing. */
MsgRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

MsgRouter.get('/write',isAuth,isMember,message.getNew);

MsgRouter.post('/write',isAuth,isMember,message.postNew);

module.exports = MsgRouter;
