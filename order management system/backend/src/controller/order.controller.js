import { Order } from "../model/Order.model.js";
import { Product } from "../model/Product.model.js";
import { updateProductStock } from "./product.controller.js";

export const createOrder = async (req, res) => {
  const { name, email, sku, quantity } = req.body;

  console.log(sku, quantity);
  try {
    const updateStock = await Product.findOneAndUpdate(
      { sku: sku, stock: { $gt: quantity } },
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
    }

    return res.status(200).json(createOrder);
  } catch (err) {
    const updateStock = await Product.findOneAndUpdate(
      { sku: sku, stock: { $gt: quantity } },
      { $inc: { stock: Number(quantity) } },
      { new: true },
    );
    console.log(updateStock);
    return res.status(400).json({ message: "cannot create order, rollback" });
    console.error("cannot create order", err);
  }
};
