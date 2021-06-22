const { OK } = require('../utils/allStatusCode');
const { createToken } = require('../utils/JWT');
const { User } = require('../models');

const registerUser = async (data, res) => {
  const user = await User.create(data);
  const { _id } = user;
  const token = createToken({ id: _id });

  res.status(OK).json({ name: data.name, token });
};

const RegisterDirector = async (req, res) => {
  // console.log('passou diretor')
  const {
    name,
    email,
    password,
  } = req.body;
  await registerUser(
    {
      name,
      email,
      password,
      role: 'director',
    },
    res,
  );
};

const RegisterTeacher = async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;
  await registerUser(
    {
      name,
      email,
      password,
      role: 'teacher',
    },
    res,
  );
};

const RegisterStudent = async (req, res) => {
  const {
    name,
    email,
    password,
    namesOfResponsibles,
    contacts,
  } = req.body;
  await registerUser(
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
