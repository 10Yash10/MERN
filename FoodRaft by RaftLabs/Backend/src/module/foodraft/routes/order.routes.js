import { Router } from "express";
import {
  createOrder,
  getBill,
  getOrdersById,
} from "../controllers/order.controller.js";
import { authenticateToken } from "../../../middlewares/authenticate.js";

const route = Router();

route.get("/orders", authenticateToken, getOrdersById);
route.get("/getBill", authenticateToken, getBill);
route.post("/order", authenticateToken, createOrder);

export default route;
