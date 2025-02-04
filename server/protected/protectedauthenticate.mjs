import jwt, { decode } from "jsonwebtoken";
import User from "../services/mongo/models/user.mjs";

const SESSION_SECRET = process.env.SESSION_SECRET;

export default async function authenticateJWT(req, res, next) {
  // Token from cookies or Authorization header
  const token = req.cookies.token;
  // if no token, return forbidden
  if (!token)
    return res
      .status(401)
      .json({ message: "unauthorized - missing jwt signin token" });
  let decoded;
  try {
    decoded = jwt.verify(token, SESSION_SECRET);
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User with your id not found" });
    }
    // attach the user to the request object
    req.user = user;
    next(); // move on to the next middle ware
  } catch (error) {
    console.error("Could not find user with JWT token:", error); // Log the error if JWT is invalid
    return res.status(500).json({ message: "internal server error" }); // return forbidden
  }
}
