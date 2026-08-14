import express from "express";
import loaders from "./loaders/index.js";
import { config } from "./config/env.js";

async function startServer() {
  const app = express();

  await loaders(app);

  app.listen(config.PORT, () =>
    config.NODE_ENV === "production"
      ? console.log("Service is running")
      : console.log(`Server running on ${config.PORT}`),
  );
}

startServer();
