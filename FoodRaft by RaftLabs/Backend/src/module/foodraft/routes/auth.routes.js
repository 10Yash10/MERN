import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);

export default route;
