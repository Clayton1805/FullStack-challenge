const { body } = require('express-validator');
const { User } = require('../../models');

const validationsRegisterAll = [
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
];

const validationsRegisterStudent = [
  body('namesOfResponsibles')
    .notEmpty()
    .withMessage('precisa ser preenchida.'),
  body('namesOfResponsibles.*')
    .matches(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/)
    .withMessage('só aceita letras.')
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  body('contacts')
    .notEmpty()
    .withMessage('precisa ser preenchida.'),
  body('contacts.*')
    .isInt()
    .withMessage('só aceita números.')
    .isLength({ min: 11, max: 11 })
    .withMessage('tem que ser composto por 11 números.'),
];

module.exports = {
  validationsRegisterAll,
  validationsRegisterStudent,
};
