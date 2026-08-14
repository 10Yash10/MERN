import dns from "node:dns/promises";
import mongoose from "mongoose";
import { config } from "../config/env.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export default async () => {
  try {
    await mongoose.connect(config.MONGO_URI, { dbName: "FoodRaft" });
    console.log("connected to db successfully");
  } catch (err) {
    console.log("unable to connect to db because: ", err);
  }
};
