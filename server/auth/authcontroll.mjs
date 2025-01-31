import "dotenv/config";
import passport from "./passportconfig.mjs";
import jwt from "jsonwebtoken";

const CLIENT_URL = process.env.CLIENT_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

/**
 * Initiate Google authentication.
 *
 * Initiates google oauth2:
 * 1. Redirect user to google oauth2 login page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the authentication result.
 * @param {Function} next - The next middleware function in the stack (not used in this function).
 */
export const googleAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};

/**
 *
 * Handles the callback from google oauth2:
 * 1. user passport google strategy to authenticate user
 * 2. redirects user to home page on valid authentication
 * 3. redirects user to login page with errors on fail
 *
 * @param {Object} req - request object with google oauth2 callback data
 * @param {Object} res - response object to redirect user
 */
export const googleAuthCallback = (req, res) => {
  const token = jwt.sign({ user: req.user }, SESSION_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true, // prevent client side js access
    secure: false && process.env.NODE_ENV === "production", // use secure tokens for production
    sameSite: "strict",
    maxAge: 3600000, // token expires in 1 hour
  });

  res.redirect(CLIENT_URL + "/oauth/callback");
};
