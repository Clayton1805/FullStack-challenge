const { Router } = require('express');
const rescue = require('express-rescue');
const LoginService = require('../services/LoginServices');

const LoginController = new Router();

LoginController.post('/', rescue(LoginService));

module.exports = LoginController;
