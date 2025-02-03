import mongoose from "mongoose";

const userSchmea = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: async function (email) {
          const user = this.constructor.findOne({ email });
          if (user) {
            if (this.id === user.id) {
              return true;
            }
            //return false;
            throw new Error("Email already in use");
          }
          return true;
        },
      },
      message: (props) => "Email already in use",
    },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    photo: { type: String, required: false },
    valid: { type: Boolean, required: true },
    emailVerified: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchmea);

export default User;
