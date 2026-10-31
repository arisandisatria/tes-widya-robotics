import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

import { mongoDBURL, PORT } from "./config.js";

import authRouter from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use("/api/auth", authRouter);
app.use("/", userRoutes);

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
