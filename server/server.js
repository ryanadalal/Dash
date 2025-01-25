require("dotenv").config({
  path: `${__dirname}/.env`,
});
if (!process.env.SERVER_PORT) {
  console.error("Server port not found");
}
const port = process.env.SERVER_PORT || 5000;

const express = require("express");
const session = require("express-session");
const app = express();
app.use(session({ resave: false, saveUninitialized: true, secret: "SECRET" }));

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    console.log("successful login");
    // Successful authentication, redirect success.
    res.redirect("/success");
  }
);
