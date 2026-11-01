import express from "express";
import { login, logout, register } from "../controller/auth.controller.js";
import { verifyToken } from "../utils/verivyToken.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", verifyToken, logout);

export default route;
