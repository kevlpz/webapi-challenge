const express = require('express');
const userRouter = require('./users/userRouter.js');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api', router);

function logger(req, res, next) {
    console.log(req.method, req.url, Date.now());
    next();
  };
  