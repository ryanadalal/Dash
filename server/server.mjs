import "dotenv/config";
import cors from "cors";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";

import authrouter from "./services/auth/authroutes.mjs";
import protectedrouter from "./protected/protecedroutes.mjs";
import connectToDb from "./services/mongo/database.mjs";

const PORT = process.env.SERVER_PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true, // Allows sending cookies
  })
);

// initalize passports session which is dependent on express session
app.use(passport.initialize());
app.use("/auth", authrouter);
app.use("/protected", protectedrouter);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy!" });
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
