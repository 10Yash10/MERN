import { config } from "../config/env.js";

export const errorHandler = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.errorCode = err.errorCode || "INERTNAL_ERROR";

  const response = {
    status: "error",
    errorCode,
    message: err.message || "Something went critically wrong",
    ...(config.NODE_ENV === "development" && { stack: err.stack }),
  };

  // Structured logging of operational vs programming errors
  if (err.isOperational) {
    console.warn(
      `[Operational Error] ${req.method} ${req.path} - Status: ${statusCode} - Code: ${errorCode} - Message: ${err.message}`,
    );
  } else {
    console.error(`[Programming Error Alert] Base Crash Trace:`, err);
  }

  res.status(statusCode).json(response);
};
