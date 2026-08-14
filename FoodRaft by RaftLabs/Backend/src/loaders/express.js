import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { errorHandler } from "../middlewares/errorHandler.js";
import AuthRoute from "../module/foodraft/routes/auth.routes.js";
import MenuRoute from "../module/foodraft/routes/menu.routes.js";
import CartRoute from "../module/foodraft/routes/cart.routes.js";
import OrderRoute from "../module/foodraft/routes/order.routes.js";
import { config } from "../config/env.js";

export default async (app) => {
  app.get("/health", (req, res) => res.status(200).end());
  app.head("/health", (req, res) => res.status(200).end());

  // middlewares
  app.use(
    cors({
      origin: config.APP_BASE_URL || "http://localhost:5173",
      credentials: true,
    }),
  );

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
        // secure: config.NODE_ENV === "production" ? true : false,
        secure: false, // for local testing
        httpOnly: true,
        // sameSite: config.NODE_ENV === "production" ? "none" : "lax",
        sameSite: "none", // for local testing
        maxAge: 7000 * 60 * 60 * 24,
      },
    }),
  );

  // routes
  app.use("/api/auth", AuthRoute);
  app.use("/api", MenuRoute);
  app.use("/api", CartRoute);
  app.use("/api", OrderRoute);

  // global error handler.
  app.use(errorHandler);
};
