import express from "express";
import cors from "cors";
import helmet from "helmet";

export default async (app) => {
  app.get("/health", (req, res) => res.status(200).end());
  app.head("/health", (req, res) => res.status(200).end());

  // middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // global error
  app.use((err, req, res) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Error";

    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  });
};
