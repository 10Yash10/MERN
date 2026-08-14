import UnauthorizedError from "../shared/errors/unauthorized-error.js";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const authenticateToken = (req, res, next) => {
  console.log("=============>", req.session);

  console.log("=========> ", req.session.userToken);
  if (!req.session || !req.session.userToken)
    throw new UnauthorizedError("Unauthorized. Session not found.");

  try {
    const decoded = jwt.verify(req.session.userToken, config.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    throw new UnauthorizedError("Unauthorized. Tampered or expired token.");
  }
};
