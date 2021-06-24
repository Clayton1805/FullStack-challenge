const { body } = require('express-validator');

const { Schools, User } = require('../../models');
const { ErrorResponseBadRequest } = require('./ErrorResponse');

const validationIdSchool = body('idSchool')
  .notEmpty()
  .withMessage('precisa ser preenchido.')
  .bail()
  .isString()
  .withMessage('tem que ser uma string.')
  .bail()
  .isLength({ min: 24, max: 24 })
  .withMessage('precisa ter 24 caracteres.')
  .bail()
  .custom((idSchool) => Schools.findById(idSchool)
    .then((school) => {
      if (!school) {
        return Promise.reject('não está cadastrada.');
      }
    }));

const ValidationsAddClass = [
  validationIdSchool,
  body('teacherId')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage('precisa ter 24 caracteres.')
    .bail()
    .custom((teacherId) => User.find({ _id: teacherId, role: 'teacher' })
      .then((user) => {
        if (user.length === 0) {
          return Promise.reject('não está cadastrado.');
        }
      })),
  body('className')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  body('grade')
    .notEmpty()
    .withMessage('precisa ser preenchida.')
    .bail()
    .isInt()
    .withMessage('tem que ser um numero.')
    .bail()
    .isLength({ min: 1 })
    .withMessage('tem que ser um numero inteiro positivo.'),
  body('studentsId')
    .if(body('studentsId').exists())
    .isArray()
    .withMessage('tem que ser um array.'),
  body('studentsId.*')
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage('precisa ter 24 caracteres.')
    .bail()
    .custom((studentsId) => User.find({ _id: studentsId, role: 'student' })
      .then((user) => {
        if (user.length === 0) {
          return Promise.reject('não está cadastrado.');
        }
      })),
  ErrorResponseBadRequest,
];

const validationIdClass = body('idClass')
  .notEmpty()
  .withMessage('precisa ser preenchido.')
  .bail()
  .isString()
  .withMessage('tem que ser uma string.')
  .bail()
  .isLength({ min: 24, max: 24 })
  .withMessage('precisa ter 24 caracteres.')
  .bail()
  .custom((idClass, { req }) => Schools.findOne(
    {
      _id: req.body.idSchool,
      'classes._id': idClass,
    },
  )
    .then((classes) => {
      if (!classes) {
        return Promise.reject('não está cadastrado.');
      }
    }));

const ValidationsUpdateClass = [
  validationIdSchool,
  validationIdClass,
  body('teacherId')
    .if(body('teacherId').exists())
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .if(body('teacherId').notEmpty())
    .isLength({ min: 24, max: 24 })
    .withMessage('precisa ter 24 caracteres.')
    .bail()
    .custom((teacherId) => User.find({ _id: teacherId, role: 'teacher' })
      .then((user) => {
        if (user.length === 0) {
          return Promise.reject('não está cadastrado.');
        }
      })),
  body('className')
    .if(body('className').exists())
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .if(body('className').notEmpty())
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  body('grade')
    .if(body('grade').exists())
    .isInt()
    .withMessage('tem que ser um numero.')
    .bail()
    .isLength({ min: 1 })
    .withMessage('tem que ser um numero inteiro positivo.'),
  ErrorResponseBadRequest,
];

const ValidationIdSchool = [
  validationIdSchool,
  ErrorResponseBadRequest,
];

const ValidationDeleteClass = [
  validationIdSchool,
  validationIdClass,
  ErrorResponseBadRequest,
];

const ValidationsAddClassStudents = [
  validationIdSchool,
  validationIdClass,
  body('studentsId')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .isArray()
    .withMessage('tem que ser um array.'),
  body('studentsId.*')
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage('precisa ter 24 caracteres.')
    .bail()
    .custom((studentsId) => User.find({ _id: studentsId, role: 'student' })
      .then((user) => {
        if (user.length === 0) {
          return Promise.reject('não está cadastrado.');
        }
      })),
  ErrorResponseBadRequest,
];

const ValidationsObservationClass = [
  validationIdSchool,
  validationIdClass,
  body('text')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .isString()
    .withMessage('tem que ser uma string.'),
  ErrorResponseBadRequest,
];

const ValidationsObservationStudent = [
  validationIdSchool,
  validationIdClass,
  body('text')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .isString()
    .withMessage('tem que ser uma string.'),
  body('studentsId')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage('precisa ter 24 caracteres.')
    .bail()
    .custom((studentsId) => User.findOne({ _id: studentsId, role: 'student' })
      .then((student) => {
        if (!student) {
          return Promise.reject('não está cadastrado.');
        }
      })),
  ErrorResponseBadRequest,
];

module.exports = {
  ValidationsAddClass,
  ValidationsUpdateClass,
  ValidationIdSchool,
  ValidationDeleteClass,
  ValidationsAddClassStudents,
  ValidationsObservationClass,
  ValidationsObservationStudent,
};
