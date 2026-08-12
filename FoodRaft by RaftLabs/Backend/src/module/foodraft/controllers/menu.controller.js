import { asyncWrapper } from "../../../shared/utils/asyncWrapper.js";
import { MenuServices } from "../services/menu.service.js";

export const fetchMenu = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const data = await MenuServices.fetchMenu();

  return res.status(200).json(data);
});

export const fetchMenuByMenuItemId = asyncWrapper(async (req, res) => {
  const { menuItemId } = req.params;

  const data = await MenuServices.fetchMenuByMenuItemId(menuItemId);

  return res.status(200).json(data);
});
