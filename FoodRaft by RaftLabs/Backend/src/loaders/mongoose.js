import mongoose from "mongoose";
import { config } from "../config/env.js";

export default async () => {
  try {
    await mongoose.connect(config.MONGO_URI, { dbName: "FoodRaft" });
    console.log("connected to db successfully");
  } catch (err) {
    console.log("unable to connect to db because: ", err);
  }
};
