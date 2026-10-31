import { JWT_TOKEN } from "../config.js";
import User from "../model/user.model.js";
import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, "Tidak terotorisasi!"));

    const isVerified = jwt.verify(token, JWT_TOKEN);

    const user = await User.findById(isVerified.id).select("-password");

    if (!user) return next(errorHandler(401, "User tidak ditemukan!"));

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
