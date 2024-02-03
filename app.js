require("dotenv").config();
const AppError = require("./utils/appError");

//PACKAGE IMPORTS
const express = require("express");
const app = express();

//SYSTEM IMPORTS
const userRouter = require("./routes/userRoutes");
const { globalErrorHandler } = require("./controllers/error.controller");

//MiddleWare
app.use(express.json());

//Routes
app.use("/app/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // next in middleware takes a paramater which is an error, wherever there is a function after this middleware which accepts err Ex : (err, req, res, next) it jumps to that fucntion by skiping all of the other functions in the middle

  res.status(404).send(`Can't find ${req.originalUrl} on this server!`);
});

//all next(errors) will come here, use next(new Error("")) or catch(err) => next(err)
app.use(globalErrorHandler);

module.exports = app;
