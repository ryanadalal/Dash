import express from "express";
import { googleAuth, googleAuthCallback } from "./authcontroll.mjs";
import passport from "./passportconfig.mjs";

// define a router with the neccessary oauth routes
const router = express.Router();
router.get("/google", googleAuth);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);

export default router;
