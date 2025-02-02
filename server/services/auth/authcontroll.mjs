import "dotenv/config";
import bcrypt from "bcryptjs";
import User from "../mongo/models/user.mjs";
import passport from "./passportconfig.mjs";

const CLIENT_URL = process.env.CLIENT_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

/**
 * Initiate registration.
 *
 * Initiates registration:
 * 1. Generate a salt and a hash with the user password
 * 2. create a new user in the database
 * 3. redirect to login page
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the authentication result.
 * @param {Function} next - The next middleware function in the stack (not used in this function).
 *
 */
export const authRegister = async (req, res, next) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });
    res.status(201).send("user registered successfully");
    res.redirect(CLIENT_URL + "/oauth/login");
  } catch (error) {
    console.log(error);
    res.status(400).send("error registering user");
  }
};

/**
 * Initiate login.
 *
 * Initiates login:
 * 1. Redirect to passport to authenticate
 * 2. redirect to oauth login upon success
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the authentication result.
 * @param {Function} next - The next middleware function in the stack (not used in this function).
 *
 */
export const authLogin = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    try {
      const token = jwt.sign({ id: user._id }, SESSION_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true, // prevent client side js access
        secure: process.env.NODE_ENV === "production", // use secure tokens for production
        sameSite: "strict",
        maxAge: 3600000, // token expires in 1 hour
      });

      res.redirect(CLIENT_URL + "/oauth/callback");
    } catch (error) {
      console.log(error);
      res.status(400).send("error singing in user");
    }
  })(req, res, next);
};
