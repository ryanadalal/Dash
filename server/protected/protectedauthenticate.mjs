import jwt from "jsonwebtoken";

const SESSION_SECRET = process.env.SESSION_SECRET;

export default function authenticateJWT(req, res, next) {
  // Token from cookies or Authorization header
  const token = req.cookies.token;
  //req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.sendStatus(401).json({ message: "unauthorized" }); // if no token, return forbidden

  try {
    const decoded = jwt.verify(token, SESSION_SECRET);
    req.user = decoded.user; // attach the user to the request object
    next(); // move on to the next middle ware
  } catch (error) {
    console.error("JWT Validation Error:", error); // Log the error if JWT is invalid
    return res.sendStatus(403).json({ message: "invalid token" }); // return forbidden
  }
}
