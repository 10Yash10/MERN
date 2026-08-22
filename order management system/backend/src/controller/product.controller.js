import { Product } from "../model/Product.model.js";

export const getProduct = async (req, res, next) => {
  const size = 50;
  const page = Number.parseInt(req.query.page || "1", 10);

  if (
    !Number.isInteger(page) ||
    String(req.query.page || "1") !== String(page) ||
    page < 1
  ) {
    const error = new Error("Page must be a positive integer");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(size)
      .skip((page - 1) * size);

    return res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};

export const updateProductStock = async (req, res, next) => {
  const { sku, newStock } = req.body;
  const stockToAdd = Number(newStock);

  try {
    if (!sku.trim() || !Number.isInteger(stockToAdd) || stockToAdd <= 0) {
      const error = new Error(
        "SKU and a positive integer stock value are required",
      );
      error.statusCode = 400;
      throw error;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { sku: sku.trim() },
      { $inc: { stock: stockToAdd } },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json(updatedProduct);
  } catch (err) {
    return next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);

    return res.status(201).json(newProduct);
  } catch (err) {
    return next(err);
  }
};
