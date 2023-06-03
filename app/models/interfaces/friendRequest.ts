import { Document, Types } from "mongoose";

export interface IFriendRequest extends Document {
  senderId: Types.ObjectId | undefined;
  recipientId: Types.ObjectId | undefined;
  status: "pending" | "accepted" | "rejected";
}
