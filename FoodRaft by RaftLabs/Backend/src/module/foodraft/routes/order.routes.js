import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
import { authenticateToken } from "../../../middlewares/authenticate.js";

const route = Router();

route.post("/order", authenticateToken, createOrder);

export default route;
