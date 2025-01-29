import express from "express";
import {
  googleAuth,
  googleAuthCallback,
  authCallbackSuccess,
} from "./authcontroll.mjs";

// define a router with the neccessary oauth routes
const router = express.Router();
router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);
router.get("/callback/success", authCallbackSuccess);

export default router;
