class AppError extends Error {
  constructor(message, statusCode, errorCode = "INTERNAL_ERROR") {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true; // Signals this is a known, handled error instance
    Error.captureStackTrace(this, this.constructor);
  }
}
