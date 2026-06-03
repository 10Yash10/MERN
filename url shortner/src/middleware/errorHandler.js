import { config } from "../config/env.js";
import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  console.log("error occured and caught by asyncHandler", err);
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || "INTERNAL_ERROR";

  // Catch Zod errors cleanly, even if wrapped
  const isZod =
    err instanceof ZodError ||
    err.name === "ZodError" ||
    Array.isArray(err.errors) ||
    Array.isArray(err.issues);

  if (isZod) {
    console.warn(
      `[Operational Error] ${req.method} ${req.path} - Status: 400 - Code: VALIDATION_ERROR`,
    );

    // Safely extract the underlying issues array from whatever Zod property is populated
    const validationIssues = err.errors || err.issues || [];

    return res.status(400).json({
      status: "fail",
      errorCode: "VALIDATION_ERROR",
      message: "Validation Error",
      // Safely map over the array using optional chaining
      errors: validationIssues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unknown",
        message: issue.message || "Invalid value",
      })),
      ...(config.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Fallback for other errors
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
