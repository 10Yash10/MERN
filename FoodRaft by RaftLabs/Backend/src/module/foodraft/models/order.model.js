import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    line1: {
      type: String,
      required: true,
      trim: true,
    },
    line2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const deliverySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required."],
    },
    productId: {
      type: String,
      required: [true, "ProductId is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      min: 1,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    isAvailable: {
      type: Boolean,
      required: [true, "Availability is required."],
    },
  },
  { _id: false },
);

const priceSchema = new mongoose.Schema(
  {
    subTotal: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    discount: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
  },
  { _id: false },
);

const statusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "RECEIVED",
      trim: true,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required."],
    },
    cartItems: {
      type: [cartSchema],
      required: true,
    },
    deliveryDetails: {
      type: deliverySchema,
      required: true,
    },
    pricing: {
      type: priceSchema,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "RECEIVED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "RECEIVED",
    },
    statusHistory: {
      type: [statusSchema],
      default: () => [{}],
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
