import { generateUniqueId } from "../utils/generateUniqueIds.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import { Types } from "mongoose";
import NotFoundError from "../../../shared/errors/not-found-error.js";

export class OrderServices {
  static async getOrdersById(userId) {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return orders;
  }

  static async getStatusNotification(id) {
    const status = await Order.find(
      { userId: id, status: { $nin: ["CANCELLED", "DELIVERED"] } },
      { _id: 0, orderId: 1, deliveryDetails: 1, status: 1 },
    );

    if (!status) throw new NotFoundError("Unable to fetch status");

    return status;
  }

  static async getBill(userId) {
    // Constant values
    const deliveryFee = 40;
    const discount = 0;
    const gst = 7; // percentage

    // Get cart items and calculate subtotal
    const cartItemPrice = await Cart.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: "$userId",
          subTotal: {
            $sum: {
              $multiply: ["$price", "$quantity"],
            },
          },
        },
      },
    ]);

    console.log(cartItemPrice);

    // If cart is empty
    if (!cartItemPrice.length) {
      return {
        subTotal: 0,
        deliveryFee: 0,
        tax: 0,
        discount: 0,
        total: 0,
      };
    }

    // Get subtotal
    const subTotal = cartItemPrice[0].subTotal;

    // Calculate GST
    const tax = (subTotal * gst) / 100;

    // Calculate total
    const total = subTotal + tax + deliveryFee - discount;

    // Return complete bill
    return {
      subTotal,
      deliveryFee,
      tax,
      discount,
      total,
    };
  }

  static async createOrder(userId, deliveryDetails) {
    // generating orderId
    const orderId = generateUniqueId();

    const cartItems = await Cart.find({ userId });

    if (!cartItems) {
      throw new NotFoundError("Items not found");
      return false;
    }

    const pricing = await this.getBill(userId);

    console.log(pricing);

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

    return createdOrder;
  }

  static async updateOrderStatus() {
    const now = new Date();
    const min = 60 * 1000;

    // update order whose status is received and 5 min is spent.
    const fiveMinutesAgo = new Date(now.getTime() - 5 * min);
    await Order.updateMany(
      { status: "RECEIVED", createdAt: { $lte: fiveMinutesAgo } },
      { $set: { status: "PREPARING" } },
    );

    // update status to out_of_order after 15mins of preparing.
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * min);
    await Order.updateMany(
      { status: "PREPARING", updatedAt: { $lte: fifteenMinutesAgo } },
      { $set: { status: "OUT_FOR_DELIVERY" } },
    );

    // update status to delivered 20 mins after out of delivery.
    const twentyMinutesAgo = new Date(now.getTime() - 20 * min);
    await Order.updateMany(
      { status: "OUT_FOR_DELIVERY", updatedAt: { $lte: twentyMinutesAgo } },
      { $set: { status: "DELIVERED" } },
    );
  }

  static async cancelOrder(orderId) {
    const order = await Order.findOne({ orderId });

    if (!order) throw new NotFoundError("Order not found");

    if (["OUT_OF_DELIVERY", "DELIVERED"].includes(order.status))
      throw new Error(
        `Cannot cancel an order that is already ${order.status.replace(/_/g, " ")}`,
      );

    order.status = "CANCELLED";

    return await order.save();
  }
}
