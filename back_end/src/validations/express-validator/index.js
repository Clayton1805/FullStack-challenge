const MiddlewareReturnValidation = require('./MiddlewareReturnValidation');
const {
  validationsRegisterUsersAll,
  validationsRegisterUsersStudent,
} = require('./validationsRegisterUsers');

module.exports = {
  MiddlewareReturnValidation,
  validationsRegisterUsersAll,
  validationsRegisterUsersStudent,
};
