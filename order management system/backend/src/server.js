import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ProductRoute from "./router/product.route.js";
import OrderRoute from "./router/order.route.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/oms";

app.use(express.json());

try {
  await mongoose.connect(MONGO_URI);
  console.log("Connection to database successful");
} catch (err) {
  console.error("Database connection failed", err.message);
  process.exit(1);
}

app.get("/", (req, res) => res.status(200).json({ status: "ok" }));

app.use("/api", ProductRoute);
app.use("/api", OrderRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const result = {
    errorCode: err.code === 11000 ? "DUPLICATE_RESOURCE" : "REQUEST_ERROR",
    message:
      err.code === 11000
        ? "A resource with this value already exists"
        : err.message || "Something went wrong",
  };

  if (err.name === "ValidationError") {
    result.message = "Request validation failed";
  }

  const status =
    err.code === 11000 || err.name === "ValidationError"
      ? 400
      : err.statusCode || 500;
  return res.status(status).json(result);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
