const { Schools } = require('../models');
const { OK } = require('../utils/allStatusCode');
const { getTokenPayload } = require('../utils/JWT');

const AddClass = async (req, res) => {
  const {
    idSchool,
    teacherId,
    grade,
    className,
    studentsId,
  } = req.body;

  const objUpdate = {
    teacherId,
    grade,
    className,
  };

  if (studentsId && studentsId.length !== 0) objUpdate.studentsId = studentsId;

  await Schools.updateOne({ _id: idSchool }, {
    $push: {
      classes: objUpdate,
    },
  });

  res.status(OK).json();
};

const GetAllClasses = async (req, res) => {
  const { idSchool } = req.body;
  const { classes } = await Schools.findOne({ _id: idSchool }, { classes: 1 });
  res.status(OK).json(classes);
};

const UpdateClass = async (req, res) => {
  const {
    idSchool,
    idClass,
    teacherId,
    grade,
    className,
  } = req.body;

  const objUpdate = {};

  if (teacherId) objUpdate['classes.$.teacherId'] = teacherId;
  if (grade) objUpdate['classes.$.grade'] = grade;
  if (className) objUpdate['classes.$.className'] = className;

  await Schools.updateOne({ _id: idSchool, 'classes._id': idClass }, {
    $set: objUpdate,
  });

  res.status(OK).json();
};

const DeleteClass = async (req, res) => {
  const {
    idSchool,
    idClass,
  } = req.body;

  await Schools.updateOne({ _id: idSchool },
    {
      $pull: {
        classes: {
          _id: idClass,
        },
      },
    });

  res.status(OK).json();
};

const AddStudents = async (req, res) => {
  const {
    idSchool,
    idClass,
    studentsId,
  } = req.body;

  await Schools.updateOne({ _id: idSchool, 'classes._id': idClass }, {
    $addToSet: {
      'classes.$.studentsId': {
        $each: studentsId,
      },
    },
  });

  res.status(OK).json();
};

const DeleteStudents = async (req, res) => {
  const {
    idSchool,
    idClass,
    studentsId,
  } = req.body;

  await Schools.updateOne({ _id: idSchool, 'classes._id': idClass },
    {
      $pull: {
        'classes.$.studentsId': { $in: studentsId },
      },
    });

  res.status(OK).json();
};

const AddObservationClass = async (req, res) => {
  const {
    idSchool,
    idClass,
    text,
  } = req.body;
  const { authorization: token } = req.headers;
  const { id } = getTokenPayload(token);

  await Schools.updateOne({ _id: idSchool, 'classes._id': idClass }, {
    $push: {
      'classes.$.observation': {
        teacherId: id,
        text,
      },
    },
  });

  res.status(OK).json();
};

module.exports = {
  GetAllClasses,
  AddClass,
  UpdateClass,
  DeleteClass,
  AddStudents,
  DeleteStudents,
  AddObservationClass,
};
