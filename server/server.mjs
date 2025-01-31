/*if (process.env.NODE_ENV == "dev") {
  console.log("dev mode enabled");
  require("dotenv").config({ path: __dirname + "./.env" });
}*/
import "dotenv/config";
import cors from "cors";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import authrouter from "./auth/authroutes.mjs";
import protectedrouter from "./protected/protecedroutes.mjs";

const PORT = process.env.SERVER_PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL, // Your frontend URL
    credentials: true, // Allows sending cookies
  })
);

// initalize passports session which is dependent on express session
app.use(passport.initialize());
app.use("/auth", authrouter);
app.use("/protected", protectedrouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
