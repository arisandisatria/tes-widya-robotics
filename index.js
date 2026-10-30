import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { mongoDBURL, PORT } from "./config.js";

import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server start on port: ${PORT}`);
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database!");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json("API for Widya Robotics knowledge test");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
