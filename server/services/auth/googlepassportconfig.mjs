import "dotenv/config";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL;
const PORT = process.env.SERVER_PORT;

/**
 * @deprecated switching to custom user login system
 */
passport.use(
  "google",
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: BACKEND_URL + ":" + PORT + "/auth/google/callback",
    },
    /*
     * verify users
     * @param {string} accessToken - The access token provided by Google.
     * @param {string} refreshToken - The refresh token provided by Google.
     * @param {Object} profile - The user's profile information from Google.
     * @param {Function} done - The callback to call with the authentication result.
     */
    function (accessToken, refreshToken, profile, done) {
      /*
       * TODO create a user in the databse based off the google profile provided
       */

      return done(null, profile, { message: "Logging in..." });
    }
  )
);
export default passport;
