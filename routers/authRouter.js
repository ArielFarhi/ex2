const { Router } = require('express');
const { authController } = require('../controllers/authController.js');
const { register, login } = require('../controllers/authController.js');

const authRouter = new Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

module.exports = { authRouter };