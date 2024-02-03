// EXtending Class from Inbuilt Error, Which only takes message as an paramter

//the reason for makinf this is, the globalErrorHandler is only called when we do
// catch (err) {
//   next(err) // this error will go there
// }
// * since our error is coming from some data is not there, the status is 400, hence we create a error
// and send it to globalErrorHandler

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// It defines a new class named AppError that extends the
// built -in Error class. By doing this, AppError inherits
// all the properties and methods of the Error class.

//  this.isOperational = true;: Indicates that this type of error is operational, meaning it's expected and can be handled in a controlled way. It helps distinguish operational errors from unexpected system errors.
// Error.captureStackTrace(this, this.constructor);: Captures the current stack trace for the error object. This provides more information about where the error occurred in the code.

module.exports = AppError;
