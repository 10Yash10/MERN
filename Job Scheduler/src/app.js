import express from "express";
import loader from "./loaders/index.js";
import { config } from "./config/env.js";

async function startServer() {
  const app = express();

  await loader(app);

  const server = app.listen(config.PORT, () =>
    console.log(`Server running on PORT: ${config.PORT}`),
  );

  const gracefullShutdown = async (signal) => {
    try {
      await mongoose.connection.close();
    } catch (err) {
      process.exit(1);
    }

    setTimeout(() => {
      console.log("Closing application forcefully.");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGINT", () => gracefullShutdown("SIGING"));
  process.on("SIGTERM", () => gracefullShutdown("SIGTERM"));
}

startServer();
