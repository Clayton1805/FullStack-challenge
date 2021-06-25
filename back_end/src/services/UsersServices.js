const { OK } = require('../utils/allStatusCode');
const { createToken } = require('../utils/JWT');
const { User } = require('../models');

const registerUser = async (data, res) => {
  const user = await User.create(data);
  const { _id, name, role } = user;
  const token = createToken({ id: _id, role });

  res.status(OK).json({ name, role, token });
};

const RegisterUsersDirector = async (req, res) => {
  const {
    name,
    cpf,
    email,
    password,
  } = req.body;
  await registerUser(
    {
      name,
      cpf,
      email,
      password,
      role: 'director',
    },
    res,
  );
};

const RegisterUsersTeacher = async (req, res) => {
  const {
    name,
    cpf,
    email,
    password,
  } = req.body;
  await registerUser(
    {
      name,
      cpf,
      email,
      password,
      role: 'teacher',
    },
    res,
  );
};

const RegisterUsersStudent = async (req, res) => {
  const {
    name,
    cpf,
    email,
    password,
    namesOfResponsibles,
    contacts,
  } = req.body;
  await registerUser(
    {
      name,
      cpf,
      email,
      password,
      namesOfResponsibles,
      contacts,
      role: 'student',
    },
    res,
  );
};

const getUsersByRole = async (res, role) => {
  const Users = await User.find({ role }, { name: 1, cpf: 1 });

  res.status(OK).json(Users);
};

const GetAllTeachers = async (_req, res) => { await getUsersByRole(res, 'teacher'); };

const GetAllStudents = async (_req, res) => { await getUsersByRole(res, 'student'); };

const GetUserById = async (req, res) => {
  const { idUser } = req.query;
  const user = await User.findById(idUser, { name: 1, cpf: 1 });
  res.status(OK).json(user);
};

module.exports = {
  RegisterUsersStudent,
  RegisterUsersDirector,
  RegisterUsersTeacher,
  GetAllTeachers,
  GetAllStudents,
  GetUserById,
};
