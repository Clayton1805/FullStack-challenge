const { Router } = require('express');
const rescue = require('express-rescue');
const {
  RegisterDirector,
  RegisterTeacher,
  RegisterStudent,
} = require('../services/RegisterService');
const {
  MiddlewareReturnValidation,
  validationsRegisterAll,
  validationsRegisterStudent,
} = require('../validations/express-validator');

const RegisterController = new Router();

RegisterController.post('/director',
  validationsRegisterAll,
  rescue(MiddlewareReturnValidation),
  rescue(RegisterDirector));

RegisterController.post('/teacher',
  validationsRegisterAll,
  rescue(MiddlewareReturnValidation),
  rescue(RegisterTeacher));

RegisterController.post('/student',
  validationsRegisterAll,
  validationsRegisterStudent,
  rescue(MiddlewareReturnValidation),
  rescue(RegisterStudent));

module.exports = RegisterController;
