import { Document, Types } from "mongoose";

export interface Imessages extends Document {
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  content: string;
}
