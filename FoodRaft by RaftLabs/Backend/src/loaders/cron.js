import cron from "node-cron";
import { OrderServices } from "../module/foodraft/services/order.service.js";

export default async () => {
  cron.schedule("*/2 * * * *", async () => {
    console.log("Running automated order status updater...");
    await OrderServices.updateOrderStatus();
  });

  console.log("cron initialized");
};
