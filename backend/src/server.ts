import express from "express";
import { connectDB } from "../config/db";
import productRoutes from "../routes/product.route";

const app = express();

app.use(express.json()); // allows us to accept json data in the req.body

app.use("/api/products", productRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}`);
});
