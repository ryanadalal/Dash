import dotenv from "dotenv";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL;
const PORT = process.env.SERVER_PORT;

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

      const userProfile = profile;
      console.log(userProfile);
      return done(null, userProfile, { message: "Logging in..." });
    }
  )
);

/**
 * Serialize the user for the session.
 *
 * This function is called when a user is authenticated. It:
 * 1. Takes the user object and stores the user in the session.
 * 2. This is used to identify the user in subsequent requests.
 *
 * @param {Object} user - The authenticated user object.
 * @param {Function} done - The callback to call with the serialized user ID.
 */
passport.serializeUser(function (user, cb) {
  console.log("serializing");
  process.nextTick(function () {
    return cb(null, user);
  });
});
passport.deserializeUser(function (req, user, cb) {
  console.log("deserializing");
  process.nextTick(function () {
    return cb(null, user);
  });
  /*
  store.findUser(null, { userName: user.email }, async (err, existingUser) => {
    if (err) {
      return cb(err);
    }

    if (existingUser) {
      return cb(null, existingUser); // return valid object if user exists in our database
    } else {
      return cb(null, false); // return false if user doesn't exists
    }
  });*/
});

export default passport;
