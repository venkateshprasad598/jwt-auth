const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  forgetPassword,
} = require("../controllers/auth.controller");

//Routes
router.post("/signup", signup);
router.post("/login", login);
router.route("/forget-password").post(forgetPassword);

module.exports = router;
