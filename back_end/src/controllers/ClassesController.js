const { Router } = require('express');
const rescue = require('express-rescue');

const {
  ValidationsTokenIsDirector,
  ValidationsToken,
  ValidationsDirectorHasSchool,
  ValidationsTokenIsTeacher,
  ValidationsTeacherHasClass,
  ValidationsTeacherHasStudent,
} = require('../validations/express-validator/ValidattionsTokenAuthorization');
const {
  ValidationsAddClass,
  ValidationsUpdateClass,
  ValidationDeleteClass,
  ValidationsAddClassStudents,
  ValidationsObservationClass,
  ValidationsObservationStudent,
} = require('../validations/express-validator/ValidationsClasses');
const {
  AddClass,
  GetAllClasses,
  UpdateClass,
  DeleteClass,
  AddStudents,
  DeleteStudents,
  AddObservationClass,
  GetDetailClass,
  AddObservationStudent,
} = require('../services/ClassesService');

const ClassesController = new Router();

ClassesController.post('/',
  ValidationsTokenIsDirector,
  ValidationsAddClass,
  ValidationsDirectorHasSchool,
  rescue(AddClass));

ClassesController.get('/',
  ValidationsToken,
  rescue(GetAllClasses));

ClassesController.get('/details',
  ValidationsToken,
  rescue(GetDetailClass));

ClassesController.put('/',
  ValidationsTokenIsDirector,
  ValidationsUpdateClass,
  ValidationsDirectorHasSchool,
  rescue(UpdateClass));

ClassesController.delete('/',
  ValidationsTokenIsDirector,
  ValidationDeleteClass,
  ValidationsDirectorHasSchool,
  rescue(DeleteClass));

ClassesController.post('/students',
  ValidationsTokenIsDirector,
  ValidationsAddClassStudents,
  ValidationsDirectorHasSchool,
  rescue(AddStudents));

ClassesController.delete('/students',
  ValidationsTokenIsDirector,
  ValidationDeleteClass,
  ValidationsDirectorHasSchool,
  rescue(DeleteStudents));

ClassesController.post('/observationClass',
  ValidationsTokenIsTeacher,
  ValidationsObservationClass,
  ValidationsTeacherHasClass,
  rescue(AddObservationClass));

ClassesController.post('/observationStudent',
  ValidationsTokenIsTeacher,
  ValidationsObservationStudent,
  ValidationsTeacherHasStudent,
  rescue(AddObservationStudent));

module.exports = ClassesController;
