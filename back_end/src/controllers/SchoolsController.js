const { Router } = require('express');
const rescue = require('express-rescue');

const VerifyAuthorizationToken = require('../validations/VerifyAuthorizationToken');
const {
  AddSchool,
  GetAllSchools,
} = require('../services/SchoolsServices');

const SchoolsController = new Router();

SchoolsController.use(VerifyAuthorizationToken);

SchoolsController.post('/',
  rescue(AddSchool));

SchoolsController.get('/',
  rescue(GetAllSchools));

module.exports = SchoolsController;
