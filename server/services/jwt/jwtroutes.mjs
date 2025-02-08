import express from "express";
import checkJWT from "./jwtcheck.mjs";
import protectedrouter from "../protected/protecedroutes.mjs";
import { jwtCheckToken } from "./jwtcontroll.mjs";

// define a router with the neccessary oauth routes
const router = express.Router();

router.use(checkJWT);
router.get("/checktoken", jwtCheckToken);
router.use("/protected", protectedrouter);

export default router;
