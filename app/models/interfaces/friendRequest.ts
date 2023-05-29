import { Document, Types } from "mongoose";

export interface IFriendRequest extends Document {
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
}
