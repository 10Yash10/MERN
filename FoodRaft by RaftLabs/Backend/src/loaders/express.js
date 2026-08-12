import express from "express";
import cors from "cors";
import { errorHandler } from "../middlewares/errorHandler.js";

export default async (app) => {
  app.get("/health", (req, res) => res.status(200).end());
  app.head("/health", (req, res) => res.status(200).end());

  // middlewares
  app.use(cors());
  app.use(express.json());

  // routes

  // global error handler.
  app.use(errorHandler);
};
