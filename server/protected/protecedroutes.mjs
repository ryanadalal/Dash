import express from "express";
import authenticateJWT from "./protectedauthenticate.mjs";
import { protectedAuthCallBackSuccess } from "./protectedcontroll.mjs";

// define a router with the neccessary oauth routes
const router = express.Router();

router.use(authenticateJWT);
router.get("/callback/success", protectedAuthCallBackSuccess);

export default router;
