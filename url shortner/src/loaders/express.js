import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "../middleware/errorHandler.js";
import hpp from "hpp";
import urlRoutes from "../modules/url/routes/urlRoutes.js";

export default async (app) => {
  app.get("/health", (req, res) => res.status(200).end());
  app.head("/health", (req, res) => res.status(200).end());

  // middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "10kb" }));
  app.use(hpp());

  // route
  app.use("/api/v1", urlRoutes);

  // global error
  app.use(errorHandler);
};
