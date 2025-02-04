import express from "express";
import authenticateJWT from "./protectedauthenticate.mjs";
import {
  protectedCompleteRegister,
  protectedSendUserData,
} from "./protectedcontroll.mjs";

// define a router with the neccessary oauth routes
const router = express.Router();

router.use(authenticateJWT);
router.get("/callback/success", protectedSendUserData);
router.post(
  "/completeregister",
  protectedCompleteRegister,
  protectedSendUserData
);

export default router;
