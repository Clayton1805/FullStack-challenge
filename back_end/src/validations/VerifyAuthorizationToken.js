const { tokenValidation } = require('../utils/JWT');
const { UNAUTHORIZED } = require('../utils/allStatusCode');

const VerifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json('missing auth token');
  }

  const payload = tokenValidation(authorization);
  req.user = payload;

  if (!payload) return res.status(UNAUTHORIZED).json('jwt malformed');

  next();
};

module.exports = VerifyAuthorization;
