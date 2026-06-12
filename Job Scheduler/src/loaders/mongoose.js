import mongoose from "mongoose";
import { config } from "../config/env.js";

export default async () => {
  try {
    mongoose.connect(config.MONGO_URI, {
      dbName: "job-scheduler",
      maxPoolSize: 50,
      minPoolSize: 20,
    });

    console.log("Connection to db is successfull");
  } catch (err) {
    console.error("Unable to connect to db due to ", err);
  }
};
