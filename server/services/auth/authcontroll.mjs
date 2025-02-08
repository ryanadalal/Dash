import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
      valid: false,
      emailVerified: false,
    });
    res
      .status(201)
      .json({ success: true, message: "user register successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error.code === 11000
          ? "Email already in use"
          : "Could not register user",
    });
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
    if (err) {
      console.error(`error: ${err}`);
      return next(err);
    }
    if (!user) {
      console.log("no user found with proper credentials");
      return res.status(401).json({ message: info.message });
    }

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
      res.status(200).json({ success: true, message: "successful login" });
    } catch (error) {
      console.error("error signing in with jwt:", error);
      res.status(500).json("error singing in user");
    }
  })(req, res, next);
};

/**
 * Initiate logout.
 *
 * Initiates logout:
 * 1. clears the cookie from the frontend
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the authentication result.
 * @param {Function} next - The next middleware function in the stack (not used in this function).
 *
 */
export const authLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // use secure tokens for production
    sameSite: "strict",
  });
  return res.status(200).json({ success: true });
};
