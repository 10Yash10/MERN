import { Router } from "express";
import { me, login, logout, register } from "../controllers/auth.controller.js";
import { authenticateToken } from "../../../middlewares/authenticate.js";

const route = Router();

route.get("/me", authenticateToken, me);
route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);

export default route;
