const { SchemaSchools } = require('../models');
const { OK } = require('../utils/allStatusCode');

const AddSchool = async (req, res) => {
  res.status(OK).json();
};

const GetAllSchools = async (_req, res) => {
  const schools = await SchemaSchools.find({}, { directorId: 1, name: 1, address: 1 });
  res.status(OK).json(schools);
};

module.exports = {
  GetAllSchools,
  AddSchool,
};
