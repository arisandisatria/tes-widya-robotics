import express from "express";
import { verifyToken } from "../utils/verivyToken.js";
import { getUserProfile } from "../controller/api-user.controller.js";

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);

export default router;
