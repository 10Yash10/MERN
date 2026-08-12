import { Router } from "express";
import {
  addToCart,
  getCartById,
  deleteFromCart,
} from "../controllers/cart.controller.js";
import { authenticateToken } from "../../../middlewares/authenticate.js";

const route = Router();

route.get("/cart", authenticateToken, getCartById);
route.post("/cart", authenticateToken, addToCart);
route.delete("/cart", authenticateToken, deleteFromCart);

export default route;
