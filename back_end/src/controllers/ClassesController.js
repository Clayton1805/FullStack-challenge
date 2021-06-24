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
  ValidationIdSchool,
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
} = require('../services/ClassesService');

const ClassesController = new Router();

ClassesController.post('/',
  ValidationsTokenIsDirector,
  ValidationsAddClass,
  ValidationsDirectorHasSchool,
  rescue(AddClass));

ClassesController.get('/',
  ValidationsToken,
  ValidationIdSchool,
  rescue(GetAllClasses));

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
  rescue(DeleteStudents));

module.exports = ClassesController;
