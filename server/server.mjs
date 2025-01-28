import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import authrouter from "./auth/authroutes.mjs";

dotenv.config();
const PORT = process.env.SERVER_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
// Add headers before the routes are defined
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
app.use(
  session({
    secret: SESSION_SECRET,
    //store, Pgsession storage
    cookie: { secure: false },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authrouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
