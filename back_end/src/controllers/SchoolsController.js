const { Router } = require('express');
const rescue = require('express-rescue');

const {
  ValidationsTokenIsDirector,
  ValidationsToken,
  ValidationsDirectorHasSchool,
} = require('../validations/express-validator/ValidattionsTokenAuthorization');
const {
  ValidationsAddSchool,
  ValidationsUpdateSchool,
  ValidationsDeleteSchool,
} = require('../validations/express-validator/ValidationsSchools');
const {
  AddSchool,
  GetAllSchools,
  UpdateSchool,
  DeleteSchool,
} = require('../services/SchoolsServices');

const SchoolsController = new Router();

SchoolsController.post('/',
  ValidationsTokenIsDirector,
  ValidationsAddSchool,
  rescue(AddSchool));

SchoolsController.get('/',
  ValidationsToken,
  rescue(GetAllSchools));

SchoolsController.put('/',
  ValidationsTokenIsDirector,
  ValidationsUpdateSchool,
  ValidationsDirectorHasSchool,
  rescue(UpdateSchool));

SchoolsController.delete('/',
  ValidationsTokenIsDirector,
  ValidationsDeleteSchool,
  ValidationsDirectorHasSchool,
  rescue(DeleteSchool));

module.exports = SchoolsController;
