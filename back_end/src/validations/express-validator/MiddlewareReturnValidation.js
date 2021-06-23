const { validationResult } = require('express-validator');
const { BAD_REQUEST } = require('../../utils/allStatusCode');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const arrayErrors = errors.array();

    // const isAuthorizationError = arrayErrors
    //   .some(({ location, param }) => location === 'header' && param === 'authorization');
    // if (isAuthorizationError) return res.status(UNAUTHORIZED).json({ arrayErrors });

    return res.status(BAD_REQUEST).json({ arrayErrors });
  }
  next();
};
