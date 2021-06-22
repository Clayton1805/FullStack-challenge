const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'secret_Aleatória_123';

const headers = {
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, headers);
const tokenValidation = (token) => jwt.decode(token, secret);
const getTokenId = (token) => jwt.decode(token).id;

module.exports = {
  createToken,
  tokenValidation,
  getTokenId,
};
