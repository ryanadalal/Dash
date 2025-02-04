import mongoose from "mongoose";

const userSchmea = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    photo: { type: String, required: false },
    birthDate: { type: Date, required: false },
    valid: { type: Boolean, required: true },
    emailVerified: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchmea);

export default User;
