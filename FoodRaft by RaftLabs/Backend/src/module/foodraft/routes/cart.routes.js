import { Router } from "express";
import {
  addToCart,
  getCartById,
  deleteFromCart,
  clearCartById,
} from "../controllers/cart.controller.js";
import { authenticateToken } from "../../../middlewares/authenticate.js";

const route = Router();

route.get("/cart", authenticateToken, getCartById);
route.post("/cart", authenticateToken, addToCart);
route.delete("/cart", authenticateToken, deleteFromCart);
route.delete("/cart/all", authenticateToken, clearCartById);

export default route;
