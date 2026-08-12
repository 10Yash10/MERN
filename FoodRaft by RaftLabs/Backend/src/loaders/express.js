import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { errorHandler } from "../middlewares/errorHandler.js";
import AuthRoute from "../module/foodraft/routes/auth.routes.js";
import { config } from "../config/env.js";

export default async (app) => {
  app.get("/health", (req, res) => res.status(200).end());
  app.head("/health", (req, res) => res.status(200).end());

  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(
    session({
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: config.MONGO_URI,
        collectionName: "sessions",
        ttl: 7 * 60 * 60 * 24,
        autoRemove: "native",
      }),
      cookie: {
        secure: config.NODE_ENV === "production" ? true : false,
        httpOnly: true,
        maxAge: 7000 * 60 * 60 * 24,
      },
    }),
  );

  // routes
  app.use("/api/auth", AuthRoute);

  // global error handler.
  app.use(errorHandler);
};
