const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'secret_Aleatória_123';

const headers = {
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, headers);
const tokenValidation = (token) => jwt.decode(token, secret);
const getTokenPayload = (token) => jwt.decode(token);

module.exports = {
  createToken,
  tokenValidation,
  getTokenPayload,
};
