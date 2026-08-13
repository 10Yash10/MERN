import { asyncWrapper } from "../../../shared/utils/asyncWrapper.js";
import { CartServices } from "../services/cart.service.js";
import { cartSchema } from "../validators/cart.validators.js";

export const getCartById = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const data = await CartServices.getCartById(id);
  return res.status(200).json(data);
});

export const addToCart = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const body = { userId: id, ...req.body };

  //   console.log(body);

  //   validate body
  const validatedBody = cartSchema.parse(body);
  const { productId, name, quantity, price, isAvailable } = validatedBody;

  const data = await CartServices.addToCart(
    id,
    productId,
    name,
    quantity,
    price,
    isAvailable,
  );

  return res.status(201).json(data);
});

export const deleteFromCart = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const { productId } = req.body;

  const success = await CartServices.deleteFromCart(id, productId);

  if (success) {
    return res.status(200).json({ message: "Item Removed from Cart." });
  } else {
    return res.status(500).json({ message: "Cannot Remove from Cart." });
  }
});
