import { Request, Response } from "express";
import Product from "../models/product.model";
import mongoose from "mongoose";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", (error as Error).message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProducts = async (req: Request, res: Response) => {
  const product = req.body; // data sent by user

  if (!product.name || !product.price || !product.image) {
    res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", (error as Error).message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in updating product:", (error as Error).message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid product id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log("error in deleting product:", (error as Error).message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
