import NotFoundError from "../../../shared/errors/not-found-error.js";
import Cart from "../models/cart.model.js";

export class CartServices {
  static async getCartById(id) {
    const cartData = await Cart.find({ userId: id });

    if (!cartData) throw new NotFoundError("Cannot find data");

    return cartData;
  }

  static async addToCart(id, productId, name, quantity, price, isAvailable) {
    const item = await Cart.findOneAndUpdate(
      {
        userId: id,
        productId,
      },
      {
        $set: { name, price, isAvailable, quantity },
        // $inc: { quantity: quantity },
      },
      {
        upsert: true,
        new: true,
      },
    );

    return item;
  }

  static async deleteFromCart(id, productId) {
    const item = await Cart.findOneAndDelete({ userId: id, productId });

    if (item) return true;
    else return false;
  }

  static async clearCartById(id) {
    const deleted = await Cart.deleteMany({ userId: id });
    if (deleted) {
      return true;
    }
  }
  // end //
}
