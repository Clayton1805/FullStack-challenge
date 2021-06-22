const { OK } = require('../utils/allStatusCode');
const { createToken } = require('../utils/JWT');
const { User } = require('../models');

const registerUser = async (data, res) => {
  // console.log('chegou RegisterValidationEmailService')

  const user = await User.create(data);

  const { _id } = user;
  const token = createToken({ id: _id });

  res.status(OK).json({ name: data.name, token });
};

const RegisterDirector = (req, res) => {
  // console.log('passou diretor')
  const {
    name,
    email,
    password,
  } = req.body;
  registerUser(
    {
      name,
      email,
      password,
      role: 'director',
    },
    res,
  );
};

const RegisterTeacher = (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;
  registerUser(
    {
      name,
      email,
      password,
      role: 'teacher',
    },
    res,
  );
};

const RegisterStudent = (req, res) => {
  const {
    name,
    email,
    password,
    namesOfResponsibles,
    contacts,
  } = req.body;
  registerUser(
    {
      name,
      email,
      password,
      namesOfResponsibles,
      contacts,
      role: 'student',
    },
    res,
  );
};

module.exports = {
  RegisterStudent,
  RegisterDirector,
  RegisterTeacher,
};
