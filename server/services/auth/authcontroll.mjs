import "dotenv/config";
import passport from "./passportconfig.mjs";
import jwt from "jsonwebtoken";
import User from "../mongo/models/user.mjs";

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
export const googleAuthCallback = async (req, res) => {
  const id = req.user.id;
  const firstName = req.user.name.givenName;
  const lastName = req.user.name.familyName;
  const email = req.user.emails[0].value;
  const photo = req.user.photos[0].value;

  User.findOne({ id: id })
    .then((user) => {
      if (user) return user;

      return User.create({
        id: id,
        email: email,
        firstName: firstName,
        lastName: lastName,
        photo: photo,
      });
    })
    .then((user) => {
      const token = jwt.sign({ user: user.id }, SESSION_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true, // prevent client side js access
        secure: process.env.NODE_ENV === "production", // use secure tokens for production
        sameSite: "strict",
        maxAge: 3600000, // token expires in 1 hour
      });

      res.redirect(CLIENT_URL + "/oauth/callback");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: `Error creating user ${error}` });
    });
};
