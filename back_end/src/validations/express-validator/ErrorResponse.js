const { validationResult } = require('express-validator');
const { BAD_REQUEST, UNAUTHORIZED } = require('../../utils/allStatusCode');

const ErrorResponseBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const arrayErrors = errors.array();
    return res.status(BAD_REQUEST).json({ arrayErrors });
  }
  next();
};

const ErrorResponseUnauthorized = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const arrayErrors = errors.array();
    return res.status(UNAUTHORIZED).json({ arrayErrors });
  }
  next();
};

module.exports = {
  ErrorResponseBadRequest,
  ErrorResponseUnauthorized,
};
