import AppError from "./appError.js";

class BadRequestError extends AppError {
  constructor(message = "Bad Request Error") {
    super(message, 400);
  }
}

export default BadRequestError;
