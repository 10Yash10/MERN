import mongoose from "mongoose";
import { config } from "../config/env.js";

export default async () => {
  try {
    mongoose.connect(config.MONGO_URI, {
      dbName: "url-shortner",
      maxPoolSize: 50,
      minPoolSize: 20,
    });
    console.log("MongoDb Connection Success");
  } catch (err) {
    console.log("MongoDB Connection Failure during bootstrap:", err);
  }
};
