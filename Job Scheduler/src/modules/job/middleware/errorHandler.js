import { response } from "express";

export const ErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode;
  const errorCode = err.errorCode;

  const respose = {
    status: "error",
    statusCode,
    errorCode,
    message: err.message || "Something went critically wrong",
  };

  return res.status(statusCode).json(response);
};
