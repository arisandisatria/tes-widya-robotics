import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import { validateEmail } from "../utils/verifyEmail.js";
import { JWT_TOKEN } from "../config.js";

export const register = async (req, res, next) => {
  const { fullname, email, gender, password, confirmPassword } = req.body;

  if (
    !fullname.trim() ||
    !email.trim() ||
    !gender.trim() ||
    !password.trim() ||
    !confirmPassword.trim()
  ) {
    return next(errorHandler(400, "Tolong isi semua input!"));
  }

  if (!validateEmail(email)) {
    return next(errorHandler(400, "Email invalid!"));
  }

  if (password !== confirmPassword) {
    return next(errorHandler(400, "Password tidak sama!"));
  }

  const hashedPassword = await bcryptjs.hashSync(password, 10);
  const newUser = new User({
    fullname,
    email,
    gender,
    password: hashedPassword,
  });

  const { password: pass, ...rest } = newUser._doc;

  try {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return next(errorHandler(409, "Email sudah terdaftar!"));
    }

    await newUser.save();

    res.status(201).json({
      message: "User berhasil dibuat!",
      data: rest,
    });
  } catch (error) {
    next(error);
    return res.redirect("/register");
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return next(errorHandler(400, "Tolong isi semua input!"));
  }

  if (!validateEmail(email)) {
    return next(errorHandler(400, "Email invalid!"));
  }

  const validUser = await User.findOne({ email });

  if (!validUser) {
    return next(errorHandler(404, "User tidak ditemukan!"));
  }

  const validPassword = await bcryptjs.compareSync(
    password,
    validUser.password,
  );

  if (!validPassword) return next(errorHandler(401, "Password salah!"));

  try {
    const token = await jwt.sign({ id: validUser._id }, JWT_TOKEN, {
      expiresIn: "1d",
    });

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token)
      .status(200)
      .json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "User sudah logout!" });
  } catch (error) {
    next(error);
  }
};
