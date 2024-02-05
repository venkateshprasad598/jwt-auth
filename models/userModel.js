const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

//HASHING PASSWORD
userSchema.pre("save", async function (next) {
  //if (!this.isModified("password")) return next();:
  // This line checks if the "password" field has not been modified.
  // If the password is not modified, it means that the document is being saved,
  // but the password hasn't changed.
  // In such cases, there's no need to rehash the password or perform any additional
  // actions related to password changes.
  // If the password is not modified, the middleware exits early by calling next() without making any changes.

  // therefore, when password is updated, before saving isTaxID, a new hashing will ne done for password
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm fField
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.RESET_TOKEN_EXPIRES_IN,
  });

  this.passwordResetToken = resetToken;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
