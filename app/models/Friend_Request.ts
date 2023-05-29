import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IFriendRequest } from "./interfaces/friendRequest";

const friendRequestSchema: Schema<IFriendRequest> = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

export const friendRequest: Model<IFriendRequest> = mongoose.model(
  "Frient_Request",
  friendRequestSchema
);
