import mongoose from "mongoose";

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
  { timeStamps: true, validateBeforeSave: true },
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
