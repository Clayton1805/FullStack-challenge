const { Schools } = require('../models');
const { OK } = require('../utils/allStatusCode');
const { getTokenPayload } = require('../utils/JWT');

const AddSchool = async (req, res) => {
  const { authorization: token } = req.headers;
  const {
    name,
    address,
  } = req.body;
  const { id } = getTokenPayload(token);
  const school = await Schools.create({ directorId: id, name, address });

  res.status(OK).json(school);
};

const GetAllSchools = async (_req, res) => {
  const schools = await Schools.find({}, { directorId: 1, name: 1, address: 1 });
  res.status(OK).json(schools);
};

const UpdateSchool = async (req, res) => {
  const {
    idSchool,
    name,
    address,
    directorId,
  } = req.body;

  const objUpdate = {};

  if (name) objUpdate.name = name;
  if (address) objUpdate.address = address;
  if (directorId) objUpdate.directorId = directorId;

  // console.log('objUpdate', objUpdate)

  await Schools.updateOne({ _id: idSchool }, {
    $set: objUpdate,
  });

  res.status(OK).json();
};

const DeleteSchool = async (req, res) => {
  const {
    idSchool,
  } = req.body;
  // console.log('DeleteSchool')

  await Schools.deleteOne({ _id: idSchool });

  res.status(OK).json();
};

module.exports = {
  GetAllSchools,
  AddSchool,
  UpdateSchool,
  DeleteSchool,
};
