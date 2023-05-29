import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { Imessages } from "./interfaces/messages";

const MessagesSchema: Schema<Imessages> = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content : { type: String , required: true}
});

export const User: Model<Imessages> = mongoose.model("Messages", MessagesSchema);
