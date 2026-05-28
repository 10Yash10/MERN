import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "../middleware/errorHandler.js";

export default async (app) => {
  app.get("/health", (req, res) => res.status(200).end());
  app.head("/health", (req, res) => res.status(200).end());

  // middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // global error
  app.use(errorHandler);
};
