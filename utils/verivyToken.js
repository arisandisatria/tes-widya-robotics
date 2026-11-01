import { JWT_TOKEN } from "../config.js";
import tokenBlacklist from "../model/tokenBlacklist.model.js";
import User from "../model/user.model.js";
import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.access_token;

    if (!token) return next(errorHandler(401, "Tidak terotorisasi!"));

    const isVerified = jwt.verify(token, JWT_TOKEN);

    const blacklisted = await tokenBlacklist.findOne({
      jti: isVerified.jti,
    });

    if (blacklisted) return next(errorHandler(401, "Token sudah dicabut!"));

    const user = await User.findById(isVerified.id).select("-password");

    if (!user) return next(errorHandler(401, "User tidak ditemukan!"));

    req.user = user;
    req.tokenPayload = isVerified;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return next(errorHandler(401, "Token tidak valid atau kedaluwarsa!"));
    }

    next(error);
  }
};
