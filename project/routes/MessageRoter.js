const express = require('express');
const MsgRouter = express.Router();

/* GET msg's listing. */
MsgRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = MsgRouter;
