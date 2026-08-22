import { Product } from "../model/Product.model.js";

export const getProduct = async (req, res) => {
  const size = 50;
  const { page } = req.query;

  console.log(page);
  const products = await Product.find()
    .limit(size)
    .skip((page - 1) * size);

  return res.status(200).json(products);
};

export const updateProductStock = async (req, res) => {
  const { sku, newStock } = req.body;

  if (newStock > 0) {
    const updatedProduct = await Product.findOneAndUpdate(
      { sku: sku },
      { $inc: { stock: Number(newStock) } },
      { new: true },
    );

    return res.status(200).json(updatedProduct);
  } else {
    return res.status(303).json({ message: "Invalid new stock" });
  }
};

export const createProduct = async (req, res) => {
  const data = req.body;

  console.log(data);
  try {
    const newProduct = await Product.insertOne(
      // { sku: data.sku },
      {
        //   $set: {
        name: data.name,
        sku: data.sku,
        price: data.price,
        stock: data.stock,
        //   },
      },
    );

    res.status(201).json({ newProduct });
  } catch (err) {
    res.status(400).json({ message: "Cannot create new Product" });
    console.error("cannot create prodcut", err);
  }
};
