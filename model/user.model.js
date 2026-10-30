import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Laki-laki", "Perempuan"],
      },
      default: "Laki-laki",
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // match: [
      //   /^[a-zA-Z0-9@#\$%\^&\+=\!*_\-]+$/,
      //   "Password can only contain letters, numbers, and standard symbols (@,#,$,%,^,&,+,=,!,*,_,-)",
      // ],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
