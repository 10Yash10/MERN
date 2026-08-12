import UnauthorizedError from "../shared/errors/unauthorized-error.js";

export const authenticateToken = (req, res, next) => {
  if (!req.session || !req.session.userToken)
    throw new UnauthorizedError("Authentication Failed");
};
