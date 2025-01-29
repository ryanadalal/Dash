/*if (process.env.NODE_ENV == "dev") {
  console.log("dev mode enabled");
  require("dotenv").config({ path: __dirname + "./.env" });
}*/
import "dotenv/config";
import express from "express";
import passport from "passport";
import authrouter from "./auth/authroutes.mjs";
import protectedrouter from "./protected/protecedroutes.mjs";

const PORT = process.env.SERVER_PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", CLIENT_URL);
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // true: require cookies to be sent with the request for using with API and the session
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});
// initalize passports session which is dependent on express session
app.use(passport.initialize());
app.use("/auth", authrouter);
app.use("/protected", protectedrouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
