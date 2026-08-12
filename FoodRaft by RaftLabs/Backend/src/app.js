import express from "express";
import loaders from "./loaders/index.js";
import { config } from "./config/env.js";

async function startServer() {
  const app = express();

  await loaders(app);

  app.listen(config.PORT, () =>
    console.log(`Server running on ${config.PORT}`),
  );
}

startServer();
