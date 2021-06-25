const { Router } = require('express');
const rescue = require('express-rescue');

const {
  RegisterUsersDirector,
  RegisterUsersTeacher,
  RegisterUsersStudent,
  GetAllTeachers,
  GetAllStudents,
} = require('../services/UsersServices');
const {
  ValidationsUsers,
  ValidationsUsersStudent,
} = require('../validations/express-validator/ValidationsUsers');
const {
  ValidationsTokenIsDirector,
} = require('../validations/express-validator/ValidattionsTokenAuthorization');

const UsersController = new Router();

UsersController.post('/director',
  ValidationsUsers,
  rescue(RegisterUsersDirector));

UsersController.post('/teacher',
  ValidationsUsers,
  rescue(RegisterUsersTeacher));

UsersController.get('/teacher',
  ValidationsTokenIsDirector,
  rescue(GetAllTeachers));

UsersController.post('/student',
  ValidationsUsersStudent,
  rescue(RegisterUsersStudent));

UsersController.get('/student',
  ValidationsTokenIsDirector,
  rescue(GetAllStudents));

module.exports = UsersController;
