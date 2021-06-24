const { body } = require('express-validator');

const { Schools, User } = require('../../models');
const { ErrorResponseBadRequest } = require('./ErrorResponse');

const ValidationsAddSchool = [
  body('name')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  body('address')
    .notEmpty()
    .withMessage('precisa ser preenchida.')
    .bail()
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  ErrorResponseBadRequest,
];

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

const ValidationsUpdateSchool = [
  validationIdSchool,
  body('directorId')
    .if(body('directorId').exists())
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .if(body('directorId').notEmpty())
    .isLength({ min: 24, max: 24 })
    .withMessage('precisa ter 24 caracteres.')
    .bail()
    .custom((directorId) => User.find({ _id: directorId, role: 'director' })
      .then((user) => {
        if (user.length === 0) {
          return Promise.reject('não está cadastrado.');
        }
      })),
  body('name')
    .if(body('name').exists())
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .if(body('name').notEmpty())
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  body('address')
    .if(body('address').exists())
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .if(body('address').notEmpty())
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  ErrorResponseBadRequest,
];

const ValidationsDeleteSchool = [
  validationIdSchool,
  ErrorResponseBadRequest,
];

module.exports = {
  ValidationsAddSchool,
  ValidationsUpdateSchool,
  ValidationsDeleteSchool,
};
