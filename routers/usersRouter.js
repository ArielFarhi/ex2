const { Router } = require('express');  
const { usersController } = require('../controllers/usersController.js');
const { authController } = require('../controllers/authController.js');

const usersRouter = new Router();

usersRouter.get('/', usersController.getUsers);

module.exports = { usersRouter };

