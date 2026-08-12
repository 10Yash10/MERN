import { Router } from "express";
import {
  fetchMenu,
  fetchMenuByMenuItemId,
} from "../controllers/menu.controller.js";
import { authenticateToken } from "../../../middlewares/authenticate.js";

const route = Router();

route.get("/menu", authenticateToken, fetchMenu);
route.get("/menu/:menuItemId", authenticateToken, fetchMenuByMenuItemId);

// route.post('/menu', createMenuItem);
// route.patch("/menu/:menuItemId", updateMenuItem);
// route.delete("/menu/:menuItemId", deleteMenuItem);

export default route;
