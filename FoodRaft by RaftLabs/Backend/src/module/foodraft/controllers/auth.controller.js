import { asyncWrapper } from "../../../shared/utils/asyncWrapper.js";
import { AuthService } from "../services/auth.service.js";
import { loginSchema, registerSchema } from "../validators/auth.validators.js";

export const me = asyncWrapper(async (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  }

  return res.status(400).json({ status: false, message: "Please Login" });
});

export const register = asyncWrapper(async (req, res) => {
  // validating body
  const validatedBody = registerSchema.parse(req.body);

  // extracting values
  const { username, email, password, phone } = validatedBody;

  // service
  const user = await AuthService.register(username, email, password, phone);

  res.status(201).json(user);
});

export const login = asyncWrapper(async (req, res) => {
  // validate body
  const validatedBody = loginSchema.parse(req.body);

  // extract email and password
  const { email, password } = validatedBody;

  // service
  const data = await AuthService.login(email, password);

  // store in session
  req.session.userToken = data;

  res.status(200).json({ success: true, message: "Login Successfull" });
});

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Could not logout" });
    }

    res.clearCookie("connect.sid");
    res.status(200).json({ success: true, message: "Logged out succesfully." });
  });
};
