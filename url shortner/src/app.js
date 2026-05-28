import express from "express";
import loaders from "./loaders/index.js";
import { config } from "./config/env.js";
import mongoose from "mongoose";

async function startServer() {
  const app = express();

  await loaders(app);

  const server = app.listen(config.PORT, () =>
    console.log(`Server running on PORT ${config.PORT}`),
  );

  const executeGracefullShutdown = (signal) => {
    console.log(
      "\n Received ${signal} signal. Commencing safe shutdown procedures...",
    );

    server.close(async () => {
      try {
        await mongoose.connection.close(false);
        console.log("💾 MongoDB Connection Pool safely drained and severed.");
        console.log("👋 System exit process clean. Goodbye.");
      } catch (err) {
        console.error("Error during database connection termination:", err);
        process.exit(1);
      }

      // forcefully closing after 10 sec
      setTimeout(() => {
        console.log("Closing the application forcefully");
        process.exit(1);
      }, 10000);
    });

    process.on("SIGINT", () => executeGracefullShutdown("SIGNINT"));
    process.on("SIGTERM", () => executeGracefullShutdown("SIGTERM"));
  };
}

startServer();
