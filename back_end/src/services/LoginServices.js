const { User } = require('../models');
const { OK } = require('../utils/allStatusCode');
const { createToken } = require('../utils/JWT');

const LoginService = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) return res.status(OK).json('E-mail ou Senha invalido');

  const { _id, name, role } = user;
  const token = createToken({ id: _id, role });

  res.status(OK).json({ name, role, token });
};

module.exports = LoginService;
