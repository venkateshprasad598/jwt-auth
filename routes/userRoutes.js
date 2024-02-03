const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const { signup, login, protect } = require("../controllers/auth.controller");

//Routes
router.post("/signup", signup);
router.post("/login", login);
router.route("/").get(protect, getAllUsers).post(createAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
