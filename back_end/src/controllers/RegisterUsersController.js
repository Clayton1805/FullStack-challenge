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
  ValidationsUsers,
  ValidationsUsersStudent,
} = require('../validations/express-validator/ValidationsUsers');
const {
  ValidationsTokenIsDirector,
} = require('../validations/express-validator/ValidattionsTokenAuthorization');

const RegisterUsersController = new Router();

RegisterUsersController.post('/director',
  ValidationsUsers,
  rescue(RegisterUsersDirector));

RegisterUsersController.post('/teacher',
  ValidationsUsers,
  rescue(RegisterUsersTeacher));

RegisterUsersController.get('/teacher',
  ValidationsTokenIsDirector,
  rescue(GetAllTeachers));

RegisterUsersController.post('/student',
  ValidationsUsersStudent,
  rescue(RegisterUsersStudent));

RegisterUsersController.get('/student',
  ValidationsTokenIsDirector,
  rescue(GetAllStudents));

module.exports = RegisterUsersController;
