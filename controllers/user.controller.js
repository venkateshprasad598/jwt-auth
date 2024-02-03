const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const getAllUsers = async (req, res) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 200,
    results: users.length,
    data: {
      users,
    },
  });
};

const createAllUsers = catchAsync(async (req, res, next) => {
  console.log({ req: req.body });
  if (!req.body.name) {
    return next(new AppError("Please provide all details", 400));
  }
  const user = await User.create(req.body);
  res.status(200).json("Hello Made It");
});

const getUser = async (req, res) => {
  try {
    res.status(200).json("Hello Made It");
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    res.status(200).json("Hello Made It");
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    res.status(200).json("Hello Made It");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
};
