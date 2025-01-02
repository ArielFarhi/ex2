const { Router } = require('express');
const { register, login } = require('../controllers/authController.js');

const authRouter = new Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

module.exports = { authRouter };