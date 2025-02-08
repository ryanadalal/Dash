import express from "express";
import { authLogin, authLogout, authRegister } from "./authcontroll.mjs";

// define a router with the neccessary oauth routes
const router = express.Router();

router.post("/login", authLogin);
router.post("/register", authRegister);
router.post("/logout", authLogout);

export default router;
