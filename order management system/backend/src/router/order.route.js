import { Router } from "express";
import { createOrder, getOrder } from "../controller/order.controller.js";

const route = Router();

route.get("/orders", getOrder);
route.post("/create-order", createOrder);

export default route;
