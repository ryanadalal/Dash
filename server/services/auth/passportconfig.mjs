import passport from "passport";
import LocalStrategy from "passport-local";

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (!user) return done(null, false, { message: "invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("invalid credentials");

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
