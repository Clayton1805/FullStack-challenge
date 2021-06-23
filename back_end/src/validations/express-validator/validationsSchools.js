const { body, header } = require('express-validator');

const validationsAddSchools = [
  header('authorization')
    .custom((token) => {
      const { role } = getTokenPayload(token);
      if (role === 'director') {
        throw new Error('cpf invalido.');
      }
      return true;
    }),
  body('name')
    .notEmpty()
    .withMessage('precisa ser preenchido.')
    .bail()
    .matches(/^[^\s]+(\s+[^\s]+)*$/)
    .withMessage('não pode ter espaços em branco no fim ou no começo.'),
  body('address')
    .notEmpty()
    .withMessage('precisa ser preenchida.')
    .bail(),
];

module.exports = {
  validationsAddSchools,
};
