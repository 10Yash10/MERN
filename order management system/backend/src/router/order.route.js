import { Router } from "express";
import { createOrder } from "../controller/order.controller.js";

const route = Router();

// route.get("/orders", getOrders);
route.post("/create-order", createOrder);

export default route;
