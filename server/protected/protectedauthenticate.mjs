import jwt from "jsonwebtoken";

const SESSION_SECRET = process.env.SESSION_SECRET;

export default function authenticateJWT(req, res, next) {
  // Token from cookies or Authorization header
  const token = req.headers["authorization"]?.split(" ")[1];
  // use this potentially instead of headers
  // req.cookies.token ||

  if (!token) return res.sendStatus(403); // if no token, return forbidden

  jwt.verify(token, SESSION_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // return forbidden
    req.user = user; // attach the user to the request object
    next(); // move on to the next middle ware
  });
}
