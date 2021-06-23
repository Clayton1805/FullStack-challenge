const { Router } = require('express');
const rescue = require('express-rescue');

const {
  RegisterUsersDirector,
  RegisterUsersTeacher,
  RegisterUsersStudent,
  GetAllTeachers,
  GetAllStudents,
} = require('../services/RegisterUsersServices');
const {
  MiddlewareReturnValidation,
  validationsRegisterUsersAll,
  validationsRegisterUsersStudent,
} = require('../validations/express-validator');
const VerifyAuthorizationToken = require('../validations/VerifyAuthorizationToken');

const RegisterUsersController = new Router();

RegisterUsersController.post('/director',
  validationsRegisterUsersAll,
  // rescue(MiddlewareReturnValidation),
  rescue(RegisterUsersDirector));

RegisterUsersController.post('/teacher',
  validationsRegisterUsersAll,
  rescue(MiddlewareReturnValidation),
  rescue(RegisterUsersTeacher));

RegisterUsersController.get('/teacher',
  VerifyAuthorizationToken,
  rescue(GetAllTeachers));

RegisterUsersController.post('/student',
  validationsRegisterUsersAll,
  validationsRegisterUsersStudent,
  rescue(MiddlewareReturnValidation),
  rescue(RegisterUsersStudent));

RegisterUsersController.get('/student',
  VerifyAuthorizationToken,
  rescue(GetAllStudents));

module.exports = RegisterUsersController;
