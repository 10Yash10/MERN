import { asyncWrapper } from "../../../shared/utils/asyncWrapper.js";
import { v4 as uuidv4 } from "uuid";
import Cart from "../models/cart.model.js";
import { deliveryValidationSchema } from "../validators/order.validator.js";
import { OrderServices } from "../services/order.service.js";

export const getBill = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const data = await OrderServices.getBill(id);

  return res.status(200).json(data);
});

export const getOrdersById = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const data = await OrderServices.getOrdersById(id);

  return res.status(200).json(data);
});

export const createOrder = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const validatedBody = await deliveryValidationSchema.parse(req.body);

  const data = await OrderServices.createOrder(
    id,
    validatedBody.deliveryDetails,
  );

  return res.status(201).json(data);
});
