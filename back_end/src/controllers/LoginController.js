const { Router } = require('express');
const rescue = require('express-rescue');
const LoginServices = require('../services/LoginServices');

const LoginController = new Router();

LoginController.post('/', rescue(LoginServices));

module.exports = LoginController;
