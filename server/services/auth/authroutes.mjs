import express from "express";
import { authLogin, authRegister } from "./authcontroll.mjs";

// define a router with the neccessary oauth routes
const router = express.Router();

router.post("/login", authLogin);
router.post("/register", authRegister);

export default router;
