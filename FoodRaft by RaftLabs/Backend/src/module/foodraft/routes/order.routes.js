import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getBill,
  getOrdersById,
  getStatusNotification,
  updateOrder,
} from "../controllers/order.controller.js";
import { authenticateToken } from "../../../middlewares/authenticate.js";

const route = Router();

route.get("/orders", authenticateToken, getOrdersById);
route.get("/status-notification", authenticateToken, getStatusNotification);
route.get("/getBill", authenticateToken, getBill);
route.post("/order", authenticateToken, createOrder);
route.patch("/update-order-status", updateOrder);
route.delete("/delete-order", authenticateToken, deleteOrder);

export default route;
