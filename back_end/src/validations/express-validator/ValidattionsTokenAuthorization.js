const { header } = require('express-validator');
const { Schools } = require('../../models');
const { getTokenPayload, tokenValidation } = require('../../utils/JWT');
const { ErrorResponseUnauthorized } = require('./ErrorResponse');

const funcValidationToken = (token) => {
  if (!token) {
    throw new Error('falta de token de autenticação.');
  }

  const payload = tokenValidation(token);

  if (!payload) throw new Error('token invalido.');

  return true;
};

const ValidationsToken = [
  header('authorization')
    .custom(funcValidationToken),
  ErrorResponseUnauthorized,
];

const ValidationsTokenIsDirector = [
  header('authorization')
    .custom(funcValidationToken)
    .bail()
    .custom((token) => {
      const { role } = getTokenPayload(token);
      if (role !== 'director') {
        throw new Error('usuário sem permissão.');
      }
      return true;
    }),
  ErrorResponseUnauthorized,
];

const ValidationsTokenIsTeacher = [
  header('authorization')
    .custom(funcValidationToken)
    .bail()
    .custom((token) => {
      const { role } = getTokenPayload(token);
      if (role !== 'teacher') {
        throw new Error('usuário sem permissão.');
      }
      return true;
    }),
  ErrorResponseUnauthorized,
];

const ValidationsDirectorHasSchool = [
  header('authorization')
    .custom((token, { req }) => Schools.findById(req.body.idSchool)
      .then((school) => {
        const { id } = getTokenPayload(token);
        const { directorId } = school;

        if (String(id) !== String(directorId)) {
          return Promise.reject('usuário não é o responsável pela escola.');
        }
      })),
  ErrorResponseUnauthorized,
];

const ValidationsTeacherHasClass = [
  header('authorization')
    .custom((token, { req }) => {
      const { id } = getTokenPayload(token);
      return Schools.findOne({
        _id: req.body.idSchool,
        'classes._id': req.body.idClass,
        'classes.teacherId': id,
      })
        .then((school) => {
          if (!school) {
            return Promise.reject('usuário não é o responsável pela turma.');
          }
        });
    }),
  ErrorResponseUnauthorized,
];

const ValidationsTeacherHasStudent = [
  header('authorization')
    .custom((token, { req }) => {
      const { id } = getTokenPayload(token);
      return Schools.findOne({
        _id: req.body.idSchool,
        'classes._id': req.body.idClass,
        'classes.teacherId': id,
        'classes.studentsId': req.body.studentsId,
      })
        .then((school) => {
          if (!school) {
            return Promise.reject('usuário não é o responsável pelo aluno.');
          }
        });
    }),
  ErrorResponseUnauthorized,
];

module.exports = {
  ValidationsToken,
  ValidationsTokenIsDirector,
  ValidationsTokenIsTeacher,
  ValidationsDirectorHasSchool,
  ValidationsTeacherHasClass,
  ValidationsTeacherHasStudent,
};
