import mongoose from "mongoose";

const userSchmea = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: false },
    valid: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchmea);

export default User;
