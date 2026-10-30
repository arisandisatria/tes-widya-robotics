import express from "express";
import {
  getHome,
  getLogin,
  getProfile,
  getRegister,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/", getHome);
router.get("/login", getLogin);
router.get("/register", getRegister);
router.get("/profile", getProfile);

export default router;
