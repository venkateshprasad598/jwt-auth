const buildErrorResponse = (status, message, error = null, stack = null) => {
  const response = {
    status,
    message,
  };

  if (error) response.error = error;
  if (stack) response.stack = stack;

  return response;
};

const sendErrorDev = (err, res) => {
  const { statusCode, status, message, stack } = err;
  const errorResponse = buildErrorResponse(status, message, err, stack);
  res.status(statusCode).json(errorResponse);
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const handleCastErrorDB = (error) => {
  // Handle specific error cases for development or production if needed
  return error;
};

const handleDuplicateFieldsDB = (error) => {
  // Handle specific error cases for development or production if needed
  return error;
};

const handleValidationErrorDB = (error) => {
  // Handle specific error cases for development or production if needed
  return error;
};

const globalErrorHandler = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    console.log({ error });
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }
};

module.exports = { globalErrorHandler };
