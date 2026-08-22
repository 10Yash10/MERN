import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ProductRoute from "./router/product.route.js";
import OrderRoute from "./router/order.route.js";

const app = express();
const PORT = 3000;

app.use(express.json());

try {
  await mongoose.connect("mongodb://localhost:27017/oms");
  console.log("connection to db successfull");
} catch (err) {
  console.error(err);
}

app.get("/", (req, res) => console.log("welcome"));

app.use("/api", ProductRoute);
app.use("/api", OrderRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
