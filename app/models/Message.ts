import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IMessage } from "./interfaces/messages";

const MessagesSchema: Schema<IMessage> = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true , default: Date.now },
});

export const Message: Model<IMessage> = mongoose.model("Messages", MessagesSchema);
