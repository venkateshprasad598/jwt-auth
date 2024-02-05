const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const { protect } = require("../controllers/auth.controller");

//this middleware will run before any api's are executed!
router.use(protect);
//Routes
router.route("/").get(getAllUsers).post(createAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
