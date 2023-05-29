import mongoose, { Schema, Document, Model, Types } from "mongoose";
import bcrypt from "bcrypt";
import { Ifriendrequest } from "./interfaces/friendRequest";

const friendRequestSchema: Schema<Ifriendrequest> = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

export const User: Model<Ifriendrequest> = mongoose.model("User", friendRequestSchema);
