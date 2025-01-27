import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import authrouter from "./auth/authroutes.mjs";

dotenv.config();
const PORT = process.env.SERVER_PORT;

const app = express();
app.use(session({ resave: false, saveUninitialized: true, secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());
app.get("/auth", authrouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
