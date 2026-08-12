import express from "express";
import cors from "cors";
import { ErrorHandler } from "../modules/job/middleware/errorHandler.js";

export default async (app) => {
  app.get("/health", (req, res) => res.status(200).end());
  app.head("/health", (req, res) => res.status(200).end());

  //   middlewares
  app.use(express.json({ limit: "10kb" }));
  app.use(cors());

  //   Global Error handler
  app.use(ErrorHandler);
};
