import {
  createProducts,
  getProducts,
  updateProduct,
  deleteProduct,
} from "./../controllers/product.controller";
import express from "express";

const router = express.Router();
// Get all products
router.get("/", getProducts);

// Adding products
router.post("/", createProducts);

// Updating a Product
router.put("/:id", updateProduct);

// Deleting products
router.delete("/:id", deleteProduct);

export default router;
