import { asyncWrapper } from "../../../shared/utils/asyncWrapper.js";
import { v4 as uuidv4 } from "uuid";
import Cart from "../models/cart.model.js";
import { deliveryValidationSchema } from "../validators/order.validator.js";
import { OrderServices } from "../services/order.service.js";

export const createOrder = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const validatedBody = await deliveryValidationSchema.parse(req.body);

  await OrderServices.createOrder(id, validatedBody.deliveryDetails);
});
