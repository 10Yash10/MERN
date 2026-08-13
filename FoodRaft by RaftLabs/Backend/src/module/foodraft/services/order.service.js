import { generateUniqueId } from "../utils/generateUniqueIds.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import { Types } from "mongoose";
import NotFoundError from "../../../shared/errors/not-found-error.js";

export class OrderServices {
  static async createOrder(userId, deliveryDetails) {
    // constatn values:
    const deliveryFee = 40;
    const discount = 0;
    const gst = 7; // in percentage

    // generating orderId
    const orderId = generateUniqueId();

    const cartItems = await Cart.find({ userId });

    if (!cartItems) {
      console.log(cartItems);
      throw new NotFoundError("Items not found");
      return false;
    }

    // getting subTotal
    const cartItemPrice = await Cart.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$userId",
          subTotal: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
    ]);

    // getting cart items;
    const subTotal = cartItemPrice ? cartItemPrice[0].subTotal : 0;

    const tax = (subTotal * gst) / 100;

    const total = subTotal + tax + deliveryFee;

    const pricing = { subTotal, deliveryFee, tax, discount, total };

    const createdOrder = await Order.create({
      orderId,
      userId,
      cartItems,
      deliveryDetails,
      pricing,
      //   statusHistory: [
      //     {
      //       status: "RECEIVED",
      //       changedAt: Date.now(),
      //     },
      //   ],
    });

    console.log(createdOrder);
  }
}
