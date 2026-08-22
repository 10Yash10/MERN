import { Order } from "../model/Order.model.js";
import { Product } from "../model/Product.model.js";

export const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (err) {
    return next(err);
  }
};

export const createOrder = async (req, res, next) => {
  const { name, email, sku, quantity } = req.body;

  if (quantity <= 0) {
    throw new Error("quantity is required and cannot be negative.");
  }

  console.log(sku, quantity);
  try {
    const updateStock = await Product.findOneAndUpdate(
      { sku: sku, stock: { $gte: quantity } },
      { $inc: { stock: -Number(quantity) } },
      { new: true },
    );
    console.log("updatedStock", updateStock);
    if (!updateStock) {
      return res.status(400).json({
        message: "Product not found or insufficient stock available.",
      });
    }

    const totalAmount = Number(updateStock.price) * Number(quantity);

    // creating order.
    const createOrder = await Order.insertOne({
      customerName: name,
      customerEmail: email,
      productId: updateStock._id,
      quantity,
      price: updateStock.price,
      totalAmount,
    });

    if (!createOrder) {
      return res.status(200).json({ message: "cannot create order" });
    }

    return res.status(201).json(createOrder);
  } catch (err) {
    return next(err);
  }
};
