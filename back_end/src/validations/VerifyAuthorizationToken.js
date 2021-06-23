const { tokenValidation } = require('../utils/JWT');
const { UNAUTHORIZED } = require('../utils/allStatusCode');

const VerifyAuthorizationToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(UNAUTHORIZED).json('missing auth token');
  }

  const payload = tokenValidation(token);
  req.user = payload;

  if (!payload) return res.status(UNAUTHORIZED).json('jwt malformed');

  next();
};

module.exports = VerifyAuthorizationToken;
