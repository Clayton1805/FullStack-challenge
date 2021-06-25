const { body } = require('express-validator');
const { User } = require('../../models');
const isValidCPF = require('../../utils/isValidCPF');
const { ErrorResponseBadRequest } = require('./ErrorResponse');

const validationsUsersGeneric = [
  body('email')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .isEmail()
    .withMessage('precisa ter um formato valido.')
    .bail()
    .custom((email) => User.find({ email })
      .then((user) => {
        if (user.length !== 0) {
          return Promise.reject('já está cadastrado.');
        }
      })),
  body('cpf')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .custom((cpf) => {
      if (!isValidCPF(cpf)) {
        throw new Error('cpf invalido.');
      }
      return true;
    })
    .bail()
    .custom((cpf) => User.find({ cpf })
      .then((user) => {
        if (user.length !== 0) {
          return Promise.reject('já está cadastrado.');
        }
      })),
  body('name')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .matches(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/)
    .withMessage('só aceita letras.')
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  body('password')
    .notEmpty()
    .withMessage('precisa ser preenchida.')
    .bail()
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .isLength({ min: 6 })
    .withMessage('precisa ter mais de 5 caracteres.'),
];

const ValidationsUsers = [
  ...validationsUsersGeneric,
  ErrorResponseBadRequest,
];

const ValidationsUsersStudent = [
  ...validationsUsersGeneric,
  body('namesOfResponsibles')
    .notEmpty()
    .withMessage('no minimo 1 responsável precisa ser preenchido.'),
  body('namesOfResponsibles.*')
    .isString()
    .withMessage('tem que ser uma string.')
    .bail()
    .if((value) => value)
    .matches(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/)
    .withMessage('só aceita letras.')
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  body('contacts')
    .notEmpty()
    .withMessage('no minimo 1 numero de telefone precisa ser preenchido.'),
  body('contacts.*')
    .matches(/^[0-9]*$/)
    .withMessage('tem que ser um numero.')
    .bail()
    .if((value) => value)
    .isLength({ min: 11, max: 11 })
    .withMessage('tem que ser composto por 11 números.'),
  ErrorResponseBadRequest,
];

module.exports = {
  ValidationsUsers,
  ValidationsUsersStudent,
};
