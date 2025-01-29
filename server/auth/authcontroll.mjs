import passport from "./passportconfig.mjs";
import dotenv from "dotenv";

dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL;
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
export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: CLIENT_URL + "/oauth/callback",
    failureRedirect: CLIENT_URL + "/login",
    failureFlash: true,
    session: true,
  })(req, res, next);
};

/**
 *
 * runs when a user is successfully authenticated:
 * 1. checks if user object is present on the request, which is set by Passport after successful authentication.
 * 2. Responds with a 200 status and user information if authentication is successful.
 * 3. Includes the user's ID, name, email, profile picture, and role in the response.
 *
 * @param {Object} req - The request object, containing authenticated user data.
 * @param {Object} res - The response object used to send back the authentication result.
 * @param {Function} next - The next middleware function in the stack (not used in this function).
 * @returns {Object} JSON object with user data on success, or an error status if authentication fails.
 */
export const authCallbackSuccess = (req, res, next) => {
  return res.status(200).json({
    success: true,
    status: 200,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.emails,
      profilePicture: req.user.photos,
    },
  });
};
