import { Document, Types } from "mongoose";

export interface IMessage extends Document {
  senderId: Types.ObjectId | undefined;
  recipientId: Types.ObjectId | undefined;
  content: string;
  timestamp: Date;
}
