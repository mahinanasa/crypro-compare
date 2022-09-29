const express = require('express');
const router = express.Router();
const usersRouter = require('./users')

const addRoutes = (app)=>{
  app.use('/api/user', usersRouter);
}

module.exports = addRoutes;
