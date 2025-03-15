import express from "express";
import { connectDB } from "../config/db";

const app = express();

const PORT = 8000;

app.get("/products", (req, res) => {
  res.send("Server is ready");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}`);
});
