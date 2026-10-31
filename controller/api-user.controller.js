import User from "../model/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return next(errorHandler(404, "User tidak ditemukan!"));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
