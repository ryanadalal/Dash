import express from "express";
import { googleAuth, googleAuthCallback } from "./googleauthcontroll.mjs";
import passport from "./googlepassportconfig.mjs";
import { authLogin, authRegister } from "./authcontroll.mjs";

// define a router with the neccessary oauth routes
const router = express.Router();
/**
 * route for initial user login
 * @deprecated switching to custom login scheme
 */
router.get("/google", googleAuth);
/**
 * route for passport authenticate's callback function
 * @deprecated switching to custom login scheme
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);

router.post("/login", authLogin);
router.post("/register", authRegister);

export default router;
