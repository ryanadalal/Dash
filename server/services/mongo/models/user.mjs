import mongoose from "mongoose";

const userSchmea = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchmea);

export default User;
