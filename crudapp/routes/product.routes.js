const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

// CREATE product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }

    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;