import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    preperationTime: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Menu = mongoose.model("Menu", menuItemSchema);

export default Menu;
