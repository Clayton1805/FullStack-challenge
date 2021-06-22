const { User } = require('../models');
const { OK } = require('../utils/allStatusCode');
const { createToken } = require('../utils/JWT');

const LoginServices = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) return res.status(OK).json('E-mail ou Senha invalido');

  const { _id, name } = user;
  const token = createToken({ id: _id });

  res.status(OK).json({ name, token });
};

module.exports = LoginServices;
