import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./interfaces/user";

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: { type: String, required: true, select: false },

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.correctPassword = async function (
  this: IUser,
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const User: Model<IUser> = mongoose.model("User", userSchema);
