export default function checkJWT(req, _, next) {
  // Token from cookies or Authorization header
  req.jwt_token = req.cookies.token;
  next();
}
