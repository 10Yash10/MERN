export const errorHandler = (err, req, res, next) => {
  console.log("error occured and caught by asynHandler", err);

  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || "INTERNAL_ERROR";

  const response = {
    status: "error",
    errorCode,
    message: err.message || "Something went wrong",
  };

  res.status(statusCode).json(response);
};
