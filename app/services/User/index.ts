import { User } from "../../models";
import bcrypt from "bcrypt";
import { IUser } from "../../models/interfaces/user";
import { friendRequest } from "../../models";
import { IFriendRequest } from "../../models/interfaces/friendRequest";

export const getAllUser = async (data: IUser) => {
  try {
    let user = await User.find({});
    if (!user) {
      return { code: 1, message: "We dont have User", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { user } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const addUser = async (data: IUser) => {
  const { name, email, password } = data;
  try {
    //  const salt = await bcrypt.genSalt();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { code: 0, message: "commonSuccess.message", data: { user } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const sendFriendRequest = async (data: IFriendRequest) => {
  const { sender, recipient, status } = data;
  try {
   const frientRequest = friendRequest.create({
      sender,
      recipient,
      status,
    });
    return { code: 0, message: "commonSuccess.message", data: { frientRequest } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
