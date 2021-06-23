const { body } = require('express-validator');
const { User } = require('../../models');
const isValidCPF = require('../../utils/isValidCPF');
const MiddlewareReturnValidation = require('./MiddlewareReturnValidation');

const validationsRegisterUsersAll = [
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
      const oi = !isValidCPF(cpf);
      console.log('entrou', oi);
      if (oi) {
        throw new Error('cpf invalido.');
      }
      return true;
    }),
  body('name')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .matches(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/)
    .withMessage('só aceita letras.')
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  body('password')
    .notEmpty()
    .withMessage('precisa ser preenchida.')
    .bail()
    .isLength({ min: 6 })
    .withMessage('precisa ter mais de 5 caracteres.'),
  MiddlewareReturnValidation,
];

const validationsRegisterUsersStudent = [
  body('namesOfResponsibles')
    .notEmpty()
    .withMessage('no minimo 1 responsável precisa ser preenchido.'),
  body('namesOfResponsibles.*')
    .matches(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/)
    .withMessage('só aceita letras.')
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  body('contacts')
    .notEmpty()
    .withMessage('no minimo 1 numero de telefone precisa ser preenchido.'),
  body('contacts.*')
    .isInt()
    .withMessage('só aceita números.')
    .isLength({ min: 11, max: 11 })
    .withMessage('tem que ser composto por 11 números.'),
];

module.exports = {
  validationsRegisterUsersAll,
  validationsRegisterUsersStudent,
};
