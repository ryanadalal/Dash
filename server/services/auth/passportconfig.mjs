import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import User from "../mongo/models/user.mjs";

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    /**
     * verify users
     * 1. if the users credentials are go to the next middle ware with the user
     * 2. if invalid throw an error or respond with message
     *
     * @param {string} email - the email provided by the user
     * @param {string} password - the password provided by the user
     * @param {Function} done - The callback to call with the authentication result.
     */
    async (email, password, done) => {
      try {
        // find the user in the database using the email
        const user = await User.findOne({ email: email });
        // if the user is not there return an error
        if (!user) return done(null, false, { message: "Invalid credentials" });
        //check if the passwords match and return an error
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return done(null, false, { message: "Invalid credentials" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
