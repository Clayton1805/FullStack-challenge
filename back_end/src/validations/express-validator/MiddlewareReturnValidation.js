const { validationResult } = require('express-validator');
const { BAD_REQUEST } = require('../../utils/allStatusCode');

module.exports = (req, res, next) => {
  // console.log('chegou Middleware espres val')
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({ arrayErrors: errors.array() });
  }
  next();
};
