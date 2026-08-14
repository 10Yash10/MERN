import Menu from "../models/menu.model.js";
import NotFoundError from "../../../shared/errors/not-found-error.js";

export class MenuServices {
  static async fetchMenu() {
    const menu = await Menu.find();

    return menu;
  }

  static async fetchMenuByMenuItemId(id) {
    console.log(id);
    const menuItem = await Menu.findById({ _id: id });

    if (!menuItem) throw new NotFoundError("Item not found");

    return menuItem;
  }
}
