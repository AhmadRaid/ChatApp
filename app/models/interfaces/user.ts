import { Document, Types } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  friends: Types.ObjectId[];
  isDeleted: boolean;

  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}
