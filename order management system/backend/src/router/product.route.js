import { Router } from "express";
import {
  createProduct,
  getProduct,
  updateProductStock,
} from "../controller/product.controller.js";

const route = Router();

route.get("/products", getProduct);
route.patch("/update-stock", updateProductStock);
route.post("/create-product", createProduct);

export default route;
